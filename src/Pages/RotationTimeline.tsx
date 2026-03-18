import { useState, useEffect, useMemo } from 'react'
import Timeline from '../components/Timeline/Timeline'
import { type Action, type ActionType, type Downtime } from '../Utils/types'
import SpellBar from '../components/SpellBar/SpellBar'
import { simulate } from '../Utils/simulation'
import { PageDiv, TimelineDiv, TimelineInfo } from './styles'
import Gauge from '../components/Gauge/gauge'

export default function RotationTimeline() {
  const [actions, setActions] = useState<Action[]>([])
  const [downtimes, setDowntimes] = useState<Downtime[]>([])
  const [timelineStart, setTimelineStart] = useState(-3.5)
  const [spellSpeed, setSpellSpeed] = useState(420)

  function addAction(action: Action) {
    setActions((prev) => [...prev, action])
  }
  function addDowntime(downtime: Downtime) {
    setDowntimes((prev) => [...prev, downtime])
  }
  useEffect(() => {
    window.addAction = addAction
    window.addDowntime = addDowntime
  }, [])
  function getNextStart(type: ActionType) {
    if (actions.length === 0) return timelineStart

    const lastAction = actions[actions.length - 1]
    const lastGCD = [...actions].reverse().find((a) => a.type === 'gcd')

    if (type === 'ogcd') {
      return lastAction.start + lastAction.cast
    }

    if (!lastGCD) return timelineStart

    const gcdReady = lastGCD.start + Math.max(lastGCD.cast, lastGCD.recast)
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
  function addSpell(spell: Omit<Action, 'id' | 'start'>) {
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
      <Gauge playerState={playerState} />
      <TimelineDiv>
        <TimelineInfo>
          <p>Total Potency: {totalPotency.toFixed(2)}</p>
          <p>Rotation Time: {rotationDuration.toFixed(2)}s</p>
          <p>Potency / Second: {pps.toFixed(2)}</p>
        </TimelineInfo>
        <Timeline
          actions={actions}
          downtimes={downtimes}
          timelineStart={timelineStart}
        />
      </TimelineDiv>
      <div>
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
