// utils/resolveMitigationState.ts
type ColorState = 'default' | 'green' | 'red'

export function resolveMitigationState(
  currentTime: number,
  activationTimes: number[],
  duration: number,
  cooldown: number
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
  if (timeDiff <= duration) return 'green'
  if (timeDiff <= cooldown) return 'red'
  return 'default'
}
