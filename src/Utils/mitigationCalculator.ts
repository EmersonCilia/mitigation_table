import { MitigationKey, MitigationMap, MechanicType, DamageType } from './types'

export default function calculateMitigation(
  baseDamage: number,
  damageType: DamageType,
  mechanicType: MechanicType,
  mitigations: MitigationMap,
  activeJobs: string[]
): number {
  let adjusted = baseDamage
  const values: Record<MitigationKey, number> = {
    // commom mitigation
    Reprisal: 0.9,
    Rampart: mechanicType === 'tankbuster' ? 0.8 : 1,
    Addle: damageType === 'magical' ? 0.9 : 0.95,
    Feint: damageType === 'magical' ? 0.95 : 0.9,
    //GNB
    Heart_of_Corundum: 0.85,
    Great_Nebula: mechanicType === 'tankbuster' ? 0.6 : 1,
    Heart_of_Light: damageType === 'magical' ? 0.9 : 0.95,
    Camouflage: mechanicType === 'tankbuster' ? 0.85 : 1,
    //DRK
    Dark_Mind: damageType === 'magical' ? 0.8 : 0.9,
    Shadowed_Vigil: mechanicType === 'tankbuster' ? 0.6 : 1,
    Oblation: 0.9,
    Dark_Missionary: damageType === 'magical' ? 0.9 : 0.95,
    //DNC
    Shield_Samba: 0.85,
    //SCH
    Fey_Illumination_sch: 0.95,
    Sacred_Soil: 0.9,
    Expedient: 0.9,
    //WHM
    Aquaveil: 0.9,
    Temperance: 0.9,
    Plenary_Indulgence: 0.9,
    //SGE
    Kerachole: 0.9,
    Holos: 0.9,
    Taurochole: 0.9,
    //WAR
    Bloodwhetting: mechanicType === 'tankbuster' ? 0.9 : 1,
    Damnation: mechanicType === 'tankbuster' ? 0.6 : 1,
    Nascent_Flash: 0.9,
    //AST
    Collective_Unconscious: 0.9,
    Exaltation: 0.9,
    Sun_Sign: 0.9,
    //PLD
    Bulwark: mechanicType === 'tankbuster' ? 0.8 : 1,
    Guardian: mechanicType === 'tankbuster' ? 0.6 : 1,
    Holy_Sheltron: mechanicType === 'tankbuster' ? 0.9 : 1,
    Intervention: 0.9,
    Passage_of_Arms: 0.85,
    //MCH
    Tactician: 0.85,
    Dismantle: 0.9,
    //RDM
    Magick_Barrier: 0.9,
    //BRD
    Troubadour: 0.85
  }

  const applied: Partial<Record<MitigationKey, boolean>> = {}

  // loop per player
  Object.entries(mitigations).forEach(([jobName, playerMits]) => {
    //  Skip if this job is not active
    if (!activeJobs.includes(jobName)) return

    //  Only process mitigations for visible/active jobs
    Object.entries(playerMits).forEach(([mitName, active]) => {
      if (active && mitName in values) {
        applied[mitName as MitigationKey] = true
      }
    })
  })

  Object.keys(applied).forEach((mitName) => {
    const key = mitName as MitigationKey
    adjusted *= values[key]
  })

  return Number(adjusted.toFixed(1))
}
