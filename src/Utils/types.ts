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
  | 'Plenary_Indulgence'

export type MitigationMap = {
  [playerName: string]: PlayerMitigations
}

export type PlayerMitigations = {
  [key in MitigationKey]?: boolean
}

export type RowData = {
  id: string
  timer: string
  skill: string
  damagetotal: number
  type: 'magical' | 'physical'
  mechanicType: string
  checkbox?: Record<string, boolean>
}

export type SkillVisibility = {
  singleMitigation: boolean
  healing: boolean
  numbers: boolean
}

export type RowStructure = {
  row: RowData
  contentWidth: number
  selectedJobs: string[]
  activations: Record<string, Record<string, number[]>>
  skillVisibility: SkillVisibility
}

export type SkillsMap = Record<string, RowData>

export type Fight = {
  id: string
  name: string
  activeJobs?: string[]
  skills?: SkillsMap
}

export type FightsMap = Record<string, Fight>

export type Group = {
  name: string
  password: string
  createdAt: number
  fights: FightsMap
}

export type GroupsMap = Record<string, Group>
