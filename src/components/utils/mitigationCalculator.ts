type DamageType = 'magical' | 'physical'
type MitigationKey =
  | 'Reprisal'
  | 'Rampart'
  | 'Heart_of_Corundum'
  | 'Great_Nebula'
  | 'Heart_of_Light'
  | 'Camouflage'
  | 'Dark_Mind'
  | 'Shadowed_Vigil'
  | 'Dark_Missionary'
  | 'Shield_Samba'
  | 'Fey_Illumination_sch'
  | 'Sacred_Soil'
  | 'Expedient'
  | 'Addle'
  | 'Feint'
  | 'Aquaveil'
  | 'Temperance'
  | 'Oblation'

type PlayerMitigations = {
  [key in MitigationKey]?: boolean
}
type MitigationMap = {
  [playerName: string]: PlayerMitigations
}

export default function calculateMitigation(
  baseDamage: number,
  damageType: DamageType,
  mitigations: MitigationMap
): number {
  let adjusted = baseDamage

  const values: Record<MitigationKey, number> = {
    // commom mitigation
    Reprisal: 0.9,
    Rampart: 0.8,
    Addle: damageType === 'magical' ? 0.9 : 0.95,
    Feint: damageType === 'magical' ? 0.95 : 0.9,
    //GNB
    Heart_of_Corundum: 0.85,
    Great_Nebula: 0.6,
    Heart_of_Light: damageType === 'magical' ? 0.9 : 0.95,
    Camouflage: 0.85,
    //DRK
    Dark_Mind: damageType === 'magical' ? 0.8 : 0.9,
    Shadowed_Vigil: 0.6,
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
    Temperance: 0.9
  }

  const applied: Partial<Record<MitigationKey, boolean>> = {}

  // loop per player
  Object.values(mitigations).forEach((playerMits) => {
    Object.entries(playerMits).forEach(([mitName, active]) => {
      if (active && mitName in values) {
        const key = mitName as MitigationKey
        applied[key] = true
      }
    })
  })

  Object.keys(applied).forEach((mitName) => {
    const key = mitName as MitigationKey
    adjusted *= values[key]
  })

  return Number(adjusted.toFixed(1))
}
