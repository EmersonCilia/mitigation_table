import { useState, useEffect, useMemo, useRef } from 'react'
import Timeline from '../../../components/Timeline/Timeline'
import {
  type Action,
  type ActionType,
  type Downtime
} from '../../../Utils/types'
import SpellBar from '../../../components/SpellBar/SpellBar'
import { simulate } from '../../../Utils/simulation'
import { PageDiv, TimelineDiv, TimelineInfo } from './styles'
import Gauge from '../../../components/Gauge/gauge'
import {
  getBossSkills,
  getRotation,
  listenForBossSkills,
  listenForRotation,
  saveRotation
} from '../../../firebase/fights'
import { Link, useParams } from 'react-router-dom'

/**
 * Component to display and manage a rotation timeline for a job in a fight.
 * Handles actions, downtimes, boss skills, and real-time updates from Firebase.
 */
export default function RotationTimeline() {
  /** List of actions in the current rotation */
  const [actions, setActions] = useState<Action[]>([])
  /** List of downtimes (periods without valid target) */
  const [downtimes, setDowntimes] = useState<Downtime[]>([])
  /** Timeline start offset in seconds */
  const [timelineStart, setTimelineStart] = useState(-3.5)
  /** Spell speed used for GCD calculations */
  const [spellSpeed, setSpellSpeed] = useState(420)
  /** References to last saved data to prevent unnecessary DB writes */
  const lastSavedActions = useRef<Action[]>([])
  const lastSavedDowntimes = useRef<Downtime[]>([])
  const lastSavedSpellSpeed = useRef<number>(spellSpeed)
  const lastSavedTimelineStart = useRef<number>(timelineStart)
  /** Flag for whether data is loaded from DB */
  const [isLoaded, setIsLoaded] = useState(false)
  /** Boss skills for the fight */
  const [bossSkills, setBossSkills] = useState<
    { name: string; start: number }[]
  >([])

  /** Params from route: group, fight, and job IDs */
  const { groupId, fightId, jobId } = useParams<{
    groupId: string
    fightId: string
    jobId: string
  }>()

  /**
   * Subscribe to boss skill updates
   */
  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForBossSkills(groupId, fightId, setBossSkills)

    return () => unsubscribe && unsubscribe()
  }, [groupId, fightId])

  /**
   * Load rotation from DB and subscribe to updates
   */
  useEffect(() => {
    if (!groupId || !fightId || !jobId) return

    let unsubscribe: (() => void) | undefined

    async function loadRotation() {
      if (!groupId || !fightId || !jobId) return

      const data = await getRotation(groupId, fightId, jobId)

      if (data) {
        setActions(data.actions || [])
        setDowntimes(data.downtimes || [])
        setSpellSpeed(data.spellSpeed || 420)
        setTimelineStart(data.timelineStart || -3.5)
      }

      unsubscribe = listenForRotation(
        groupId,
        fightId,
        jobId,
        (actionsFromDB) => {
          setActions(actionsFromDB)
          lastSavedActions.current = actionsFromDB
        }
      )

      setIsLoaded(true)
    }

    loadRotation()

    return () => unsubscribe && unsubscribe()
  }, [groupId, fightId, jobId])

  /**
   * Save rotation whenever actions, downtimes, spellSpeed, or timelineStart change
   */
  useEffect(() => {
    if (!isLoaded || !groupId || !fightId || !jobId) return

    const save = async () => {
      // only save if something actually changed
      const hasChanged =
        JSON.stringify(actions) !== JSON.stringify(lastSavedActions.current) ||
        JSON.stringify(downtimes) !==
          JSON.stringify(lastSavedDowntimes.current) ||
        spellSpeed !== lastSavedSpellSpeed.current ||
        timelineStart !== lastSavedTimelineStart.current

      if (!hasChanged) return

      await saveRotation(groupId, fightId, jobId, {
        actions,
        downtimes,
        spellSpeed,
        timelineStart
      })

      lastSavedActions.current = actions
      lastSavedDowntimes.current = downtimes
      lastSavedSpellSpeed.current = spellSpeed
      lastSavedTimelineStart.current = timelineStart
    }

    save()
  }, [
    actions,
    downtimes,
    spellSpeed,
    timelineStart,
    groupId,
    fightId,
    jobId,
    isLoaded
  ])

  useEffect(() => {
    if (!groupId || !fightId) return

    const fetchBossSkills = async () => {
      const skills = await getBossSkills(groupId, fightId)
      setBossSkills(skills)
    }

    fetchBossSkills()
  }, [groupId, fightId])

  useEffect(() => {
    window.addAction = addAction
    window.addDowntime = addDowntime
  }, [])

  /**
   * Add a new action to the rotation
   * @param action Action to add
   */
  function addAction(action: Action) {
    setActions((prev) => [...prev, action])
  }

  /**
   * Add a new downtime
   * @param downtime Downtime period to add
   */
  function addDowntime(downtime: Downtime) {
    setDowntimes((prev) => [...prev, downtime])
  }

  /**
   * Calculate the next available start time for a new action
   * @param type Action type ("gcd" or "ogcd")
   * @returns Next start time in seconds
   */
  function getNextStart(type: ActionType) {
    if (actions.length === 0) return timelineStart

    const lastAction = actions[actions.length - 1]
    const lastGCD = [...actions].reverse().find((a) => a.type === 'gcd')

    if (type === 'ogcd') {
      // OGCDs only care about animation lock, not gcd
      return lastAction.start + lastAction.cast
    }

    // GCDs must respect last GCD and animation lock of last action (even if OGCD)
    const gcdReady = lastGCD
      ? lastGCD.start + Math.max(lastGCD.cast, lastGCD.recast)
      : timelineStart
    const animationLockEnd = lastAction.start + lastAction.cast

    return Math.max(gcdReady, animationLockEnd)
  }

  /**
   * Check if a time falls during any downtime
   * @param time Time in seconds
   */
  function isDuringDowntime(time: number) {
    return downtimes.some(
      (dt) => time >= dt.start && time < dt.start + dt.duration
    )
  }

  /**
   * Check if a cast is invalid (requires target but falls during downtime)
   * @param start Cast start time
   * @param cast Cast duration
   * @param requiresTarget Whether the action requires a target
   */
  function isCastInvalid(start: number, cast: number, requiresTarget: boolean) {
    if (!requiresTarget) return false

    const end = start + cast

    return isDuringDowntime(start) || isDuringDowntime(end)
  }

  /**
   * Add a spell action for a job
   * @param spell Spell data without id/start
   */
  function addSpell(spell: Omit<Action, 'id' | 'start'> & { job: string }) {
    const start = getNextStart(spell.type)

    if (isCastInvalid(start, spell.cast, spell.requiresTarget)) return

    const action: Action = { ...spell, id: crypto.randomUUID(), start }

    setActions((prev) => [...prev, action])
  }

  /** Delete the last action in the rotation */
  function deleteLastAction() {
    setActions((prev) => prev.slice(0, -1))
  }

  /** Undo the last downtime added */
  function undoLastDowntime() {
    setDowntimes((prev) => {
      if (prev.length === 0) return prev
      return prev.slice(0, -1)
    })
  }

  /**
   * Calculate GCD for given base and spell speed
   * @param baseGCD Base gcd in seconds
   * @param spellSpeed Spell speed value
   */
  function calculateGCD(baseGCD: number, spellSpeed: number) {
    const levelSub = 420
    const levelDiv = 2780

    const speedModifier = Math.ceil((130 * (levelSub - spellSpeed)) / levelDiv)
    const gcd = Math.floor((baseGCD * (1000 + speedModifier)) / 10000) / 100
    return gcd
  }

  /** GCD function bound to current spellSpeed */
  const getGCD = (baseGCD: number) => calculateGCD(baseGCD, spellSpeed)

  /** Current simulation result from actions */
  const simulation = useMemo(() => simulate(actions), [actions])
  const playerState = simulation.state
  const totalPotency = simulation.totalPotency

  /** Rotation duration in seconds */
  const rotationDuration = useMemo(() => {
    if (actions.length === 0) return 0
    const lastAction = actions[actions.length - 1]
    const endTime = lastAction.start + lastAction.cast
    return Math.max(endTime, 0)
  }, [actions])

  /** Potency per second */
  const pps = useMemo(() => {
    if (rotationDuration <= 0) return 0
    return totalPotency / rotationDuration
  }, [totalPotency, rotationDuration])

  return (
    <PageDiv>
      <div>
        <Gauge playerState={playerState} />
      </div>
      <TimelineDiv>
        <TimelineInfo>
          <p>Total Potency: {totalPotency.toFixed(2)}</p>
          <p>Rotation Time: {rotationDuration.toFixed(2)}s</p>
          <p>Potency / Second: {pps.toFixed(2)}</p>
        </TimelineInfo>
        <Timeline
          actions={actions}
          downtimes={downtimes}
          bossSkills={bossSkills}
          timelineStart={timelineStart}
        />
      </TimelineDiv>
      <div>
        <Link to={`/${groupId}/${fightId}`} style={{ textDecoration: 'none' }}>
          <button>go back</button>
        </Link>
        <div>
          <input
            id="spellSpeedInput"
            type="text"
            placeholder="420 (2.5) by default"
            style={{ width: '120px' }}
          />

          <button
            onClick={() => {
              const value = (
                document.getElementById('spellSpeedInput') as HTMLInputElement
              ).value

              const spellSpeed = Number(value)

              if (isNaN(spellSpeed)) {
                return
              }

              setSpellSpeed(spellSpeed)
            }}
          >
            Set Spell Speed
          </button>
        </div>

        <div>
          <input
            id="prepullInput"
            type="text"
            placeholder="-3.5 default"
            style={{ width: '120px' }}
          />

          <button
            onClick={() => {
              const value = (
                document.getElementById('prepullInput') as HTMLInputElement
              ).value

              const prepull = Number(value)

              if (isNaN(prepull)) {
                return
              }

              setTimelineStart(prepull)
            }}
          >
            Set Prepull
          </button>
        </div>

        <SpellBar
          addSpell={addSpell}
          addDowntime={addDowntime}
          playerState={playerState}
          action={actions}
          calculateGCD={getGCD}
          rotationDuration={rotationDuration}
        />
        <button onClick={deleteLastAction}>Undo Last Spell</button>
        <button onClick={undoLastDowntime}>Undo Downtime</button>
      </div>
    </PageDiv>
  )
}
