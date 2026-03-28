import { toSeconds } from './ToSeconds'
import { RowData } from './types'

// utils/resolveMitigationState.ts
type ColorState = 'default' | 'green' | 'red'

export function resolveMitigationState(
  currentTime: number,
  activationTimes: number[],
  duration: number,
  cooldown: number,
  rows: RowData[],
  skill: string,
  type?: string
): ColorState {
  let activationTime: number | null = null
  for (let i = activationTimes.length - 1; i >= 0; i--) {
    if (activationTimes[i] <= currentTime) {
      activationTime = activationTimes[i]
      break
    }
  }

  if (activationTime === null) return 'default'
  const timeDiff = currentTime - activationTime
  // STILL ON DURATION
  if (timeDiff <= duration) {
    // Party shield logic (breaks on damage)
    if (type === 'partyShield') {
      const damageCount = rows.reduce((count, r) => {
        const t = toSeconds(r.timer)

        if (t < activationTime! || t >= currentTime) return count
        if (r.damagetotal > 0) return count + 2

        return count
      }, 0)
      if (damageCount >= 2) {
        return timeDiff <= cooldown ? 'red' : 'default'
      }

      return 'green'
    }
    return 'green'
  }
  // COOLDOWN
  if (timeDiff <= cooldown) return 'red'

  return 'default'
}
