import { mitigationsData } from '../components/Data/MitigationData'
import { MitigationKey, MitigationMap, MechanicType, DamageType } from './types'

export default function calculateMitigation(
  baseDamage: number,
  damageType: DamageType,
  mechanicType: MechanicType,
  mitigations: MitigationMap,
  activeJobs: string[],
  mainTank: string | null
): number {
  let adjusted = baseDamage
  let flatReduction = 0
  const applied: Partial<Record<MitigationKey, string[]>> = {}
  // loop per player

  Object.entries(mitigations).forEach(([jobName, playerMits]) => {
    if (!activeJobs.includes(jobName)) return
    Object.entries(playerMits).forEach(([mitName, active]) => {
      if (!active) return
      const key = mitName as MitigationKey
      if (!(key in applied)) applied[key] = []
      applied[key]?.push(jobName) // store which job triggered this mitigation
    })
  })

  Object.entries(applied).forEach(([mitName, jobs]) => {
    const key = mitName as MitigationKey
    const mit = mitigationsData[key]
    if (!mit) return

    if (mit.type === 'partyShield') {
      flatReduction += 32500
      return
    }

    // now you have an array of jobs that applied this mitigation
    const mult =
      typeof mit.multiplier === 'function'
        ? jobs?.reduce((acc, jobName) => {
            return (
              acc * mit.multiplier(damageType, mechanicType, mainTank, jobName)
            )
          }, 1)
        : (mit.multiplier ?? 1)

    adjusted *= mult
  })

  adjusted -= flatReduction
  return Number(Math.max(adjusted, 0).toFixed(1)) // ensure damage doesn't go negative
}
