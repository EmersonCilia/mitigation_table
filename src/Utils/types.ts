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
  type: DamageType
  mechanicType: MechanicType
  checkbox?: Record<string, boolean>
}
export type MechanicType = 'raidwide' | 'debuff' | 'tankbuster' | 'mechanic'
export type DamageType = 'magical' | 'physical'

export type SkillVisibility = {
  singleMitigation: boolean
  healing: boolean
  numbers: boolean
}

export type RowStructure = {
  row: RowData
  activeJobs: string[]
  activations: Record<string, Record<string, number[]>>
  skillVisibility: SkillVisibility
  visibleJobs: string[]
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
export type ColorState = 'green' | 'red' | 'default'

export type ActionType = 'gcd' | 'ogcd' | 'bossSkill'

export interface AddSpell {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
}
export interface addDowntime {
  addDowntime: (Downtime: Omit<Downtime, 'id' | 'start'>) => void
}

export interface PlayerState {
  astralFire: number
  umbralIce: number
  umbralHearts: number
  paradox: boolean
  thunderhead: boolean
  polyglot: number
  polyglotTimer: number
  astralGauge: number
  fireStarter: boolean
  mana: number
  highThunderDuration: number
  highThunderTickTimer: number
  highThunderDotPotency: number
  swiftcast: number
  triplecast: number
  triplecastDuration: number
  leylines: number
}

export interface Action {
  id: string
  name: string
  icon: string | null
  start: number
  cast: number
  type: ActionType
  potency: number
  requiresTarget: boolean
  recast: number
  cooldown: number
  manacost: number
  dotPotency?: number
  dotDuration?: number
  dotInterval?: number
  job: string
}

export interface Downtime {
  id: string
  start: number
  duration: number
}
export const actions: Action[] = []

export const downtimes: Downtime[] = []

export const PIXELS_PER_SECOND = 50
export const ROW_DURATION = 15
export const OFFSET = 30
