export type MitigationKey =
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
  | 'Kerachole'
  | 'Holos'
  | 'Taurochole'
  | 'Bloodwhetting'
  | 'Damnation'
  | 'Nascent_Flash'
  | 'Collective_Unconscious'
  | 'Exaltation'
  | 'Sun_Sign'
  | 'Bulwark'
  | 'Guardian'
  | 'Holy_Sheltron'
  | 'Intervention'
  | 'Passage_of_Arms'
  | 'Dismantle'
  | 'Magick_Barrier'
  | 'Troubadour'
  | 'Tactician'

export type MitigationMap = {
  [playerName: string]: PlayerMitigations
}

export type PlayerMitigations = {
  [key in MitigationKey]?: boolean
}
