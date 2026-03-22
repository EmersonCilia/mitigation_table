import { useState, useEffect, useMemo } from 'react'
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
  saveRotation
} from '../../../firebase/fights'
import { Link, useParams } from 'react-router-dom'

export default function RotationTimeline() {
  const [actions, setActions] = useState<Action[]>([])
  const [downtimes, setDowntimes] = useState<Downtime[]>([])
  const [timelineStart, setTimelineStart] = useState(-3.5)
  const [spellSpeed, setSpellSpeed] = useState(420)
  const [isLoaded, setIsLoaded] = useState(false)

  const [bossSkills, setBossSkills] = useState<
    { name: string; start: number }[]
  >([])

  const { groupId, fightId, jobId } = useParams<{
    groupId: string
    fightId: string
    jobId: string
  }>()

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForBossSkills(groupId, fightId, setBossSkills)

    return () => unsubscribe && unsubscribe()
  }, [groupId, fightId])
  useEffect(() => {
    async function loadRotation() {
      if (!groupId || !fightId || !jobId) return

      const data = await getRotation(groupId, fightId, jobId)

      if (data) {
        setActions(data.actions || [])
        setDowntimes(data.downtimes || [])
        setSpellSpeed(data.spellSpeed || 420)
        setTimelineStart(data.timelineStart || -3.5)
      }

      setIsLoaded(true)
    }

    loadRotation()
  }, [groupId, fightId, jobId])
  useEffect(() => {
    if (!isLoaded) return

    const timeout = setTimeout(() => {
      async function autoSave() {
        if (!groupId || !fightId || !jobId) return

        await saveRotation(groupId, fightId, jobId, {
          spellSpeed,
          timelineStart,
          actions,
          downtimes
        })
      }

      autoSave()
    }, 250)

    return () => clearTimeout(timeout)
  }, [
    groupId,
    fightId,
    jobId,
    actions,
    downtimes,
    spellSpeed,
    timelineStart,
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

  function addAction(action: Action) {
    setActions((prev) => [...prev, action])
  }
  function addDowntime(downtime: Downtime) {
    setDowntimes((prev) => [...prev, downtime])
  }
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
  function isDuringDowntime(time: number) {
    return downtimes.some(
      (dt) => time >= dt.start && time < dt.start + dt.duration
    )
  }
  function isCastInvalid(start: number, cast: number, requiresTarget: boolean) {
    if (!requiresTarget) return false

    const end = start + cast

    return isDuringDowntime(start) || isDuringDowntime(end)
  }
  function addSpell(spell: Omit<Action, 'id' | 'start'> & { job: string }) {
    const start = getNextStart(spell.type)

    if (isCastInvalid(start, spell.cast, spell.requiresTarget)) {
      return
    }

    const action: Action = {
      ...spell,
      id: crypto.randomUUID(),
      start
    }

    setActions((prev) => [...prev, action])
  }
  function deleteLastAction() {
    setActions((prev) => prev.slice(0, -1))
  }
  function undoLastDowntime() {
    setDowntimes((prev) => {
      if (prev.length === 0) return prev
      return prev.slice(0, -1)
    })
  }
  function calculateGCD(baseGCD: number, spellSpeed: number) {
    const levelSub = 420
    const levelDiv = 2780

    const speedModifier = Math.ceil((130 * (levelSub - spellSpeed)) / levelDiv)

    const gcd = Math.floor((baseGCD * (1000 + speedModifier)) / 10000) / 100

    return gcd
  }

  const getGCD = (baseGCD: number) => calculateGCD(baseGCD, spellSpeed)
  const simulation = useMemo(() => simulate(actions), [actions])
  const playerState = simulation.state
  const totalPotency = simulation.totalPotency
  const rotationDuration = useMemo(() => {
    if (actions.length === 0) return 0
    const lastAction = actions[actions.length - 1]
    const endTime = lastAction.start + lastAction.cast
    return Math.max(endTime, 0)
  }, [actions])
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
