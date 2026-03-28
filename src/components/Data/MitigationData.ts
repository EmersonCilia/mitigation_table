import { DamageType, MechanicType } from '../../Utils/types'

export const mitigationsData = {
  // Common
  Reprisal: { duration: 15, cooldown: 60, type: 'healing', multiplier: 0.9 },
  Rampart: {
    duration: 20,
    cooldown: 90,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.8
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.8
      return 1
    }
  },
  Addle: {
    duration: 15,
    cooldown: 90,
    type: 'healing',
    multiplier: (damageType: DamageType) =>
      damageType === 'magical' ? 0.9 : 0.95
  },
  Feint: {
    duration: 15,
    cooldown: 90,
    type: 'healing',
    multiplier: (damageType: DamageType) =>
      damageType === 'physical' ? 0.9 : 0.95
  },

  // GNB
  Heart_of_Corundum: {
    duration: 8,
    cooldown: 25,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.85
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.85
      return 1
    }
  },
  Clarity_of_Corundum: {
    duration: 4,
    cooldown: 0,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.85
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.85
      return 1
    }
  },
  Great_Nebula: {
    duration: 15,
    cooldown: 120,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.6
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.6
      return 1
    }
  },
  Heart_of_Light: {
    duration: 15,
    cooldown: 90,
    type: 'healing',
    multiplier: (damageType: DamageType) =>
      damageType === 'magical' ? 0.9 : 0.95
  },
  Camouflage: {
    duration: 20,
    cooldown: 90,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.85
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.85
      return 1
    }
  },
  Superbolide: { duration: 10, cooldown: 360, type: 'healing', multiplier: 1 },

  // DRK
  Dark_Mind: {
    duration: 10,
    cooldown: 60,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName)
        return damageType === 'magical' ? 0.8 : 0.9
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName)
        return damageType === 'magical' ? 0.8 : 0.9
      return 1
    }
  },
  Shadowed_Vigil: {
    duration: 15,
    cooldown: 120,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.6
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.6
      return 1
    }
  },
  Oblation: {
    duration: 10,
    cooldown: 60,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.9
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.9
      return 1
    }
  },
  Dark_Missionary: {
    duration: 15,
    cooldown: 90,
    type: 'healing',
    multiplier: (damageType: DamageType) =>
      damageType === 'magical' ? 0.9 : 0.95
  },
  The_Blackest_Night: {
    duration: 0,
    cooldown: 15,
    type: 'healing',
    multiplier: 1
  },
  Living_Dead: { duration: 10, cooldown: 300, type: 'healing', multiplier: 1 },

  // PLD
  Guardian: {
    duration: 15,
    cooldown: 120,
    type: 'singleMitigation',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.6
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.6
      return 1
    }
  },
  Bulwark: {
    duration: 10,
    cooldown: 90,
    type: 'singleMitigation',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.8
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.8
      return 1
    }
  },
  Holy_Sheltron: {
    duration: 8,
    cooldown: 5,
    type: 'singleMitigation',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.85
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.85
      return 1
    }
  },
  Knights_Resolve: {
    duration: 4,
    cooldown: 0,
    type: 'singleMitigation',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.85
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.85
      return 1
    }
  },
  Intervention: {
    duration: 8,
    cooldown: 10,
    type: 'singleMitigation',
    multiplier: 0.9
  },
  Passage_of_Arms: {
    duration: 5,
    cooldown: 120,
    type: 'healing',
    multiplier: 0.85
  },
  Cover: {
    duration: 12,
    cooldown: 120,
    type: 'singleMitigation',
    multiplier: 1
  },
  Hallowed_Ground: {
    duration: 10,
    cooldown: 420,
    type: 'healing',
    multiplier: 1
  },
  Divine_Veil: {
    duration: 30,
    cooldown: 90,
    type: 'partyShield'
  },

  // WAR
  Damnation: {
    duration: 10,
    cooldown: 120,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.6
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.6
      return 1
    }
  },
  Equilibrium: { duration: 0, cooldown: 60, type: 'healing', multiplier: 1 },
  Thrill_of_Battle: {
    duration: 10,
    cooldown: 90,
    type: 'healing',
    multiplier: 1
  },
  Bloodwhetting: {
    duration: 8,
    cooldown: 25,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.9
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.9
      return 1
    }
  },
  Stem_the_Flow: {
    duration: 8,
    cooldown: 25,
    type: 'healing',
    multiplier: (
      damageType: DamageType,
      mechanicType: MechanicType,
      mainTank: string | null,
      jobName: string
    ) => {
      if (mechanicType === 'tankbusterMT' && mainTank === jobName) return 0.9
      if (mechanicType === 'tankbusterOT' && mainTank !== jobName) return 0.9
      return 1
    }
  },
  Nascent_Flash: {
    duration: 8,
    cooldown: 25,
    type: 'healing',
    multiplier: 0.9
  },
  Holmgang: { duration: 10, cooldown: 240, type: 'healing', multiplier: 1 },
  Shake_It_Off: {
    duration: 30,
    cooldown: 90,
    type: 'partyShield',
    multiplier: 1
  },

  // SGE
  Taurochole: {
    duration: 15,
    cooldown: 45,
    type: 'singleMitigation',
    multiplier: 0.9
  },
  Haima: { duration: 15, cooldown: 120, type: 'healing', multiplier: 1 },
  Kerachole: { duration: 15, cooldown: 30, type: 'healing', multiplier: 0.9 },
  Holos: { duration: 20, cooldown: 120, type: 'healing', multiplier: 0.9 },
  Phisis_II: { duration: 15, cooldown: 60, type: 'healing', multiplier: 1 },
  Panhaima: { duration: 15, cooldown: 120, type: 'partyShield', multiplier: 1 },
  Philosophia: { duration: 20, cooldown: 180, type: 'healing', multiplier: 1 },
  Zoe: { duration: 30, cooldown: 90, type: 'healing', multiplier: 1 },
  Pneuma: { duration: 0, cooldown: 120, type: 'healing', multiplier: 1 },
  Eukrasian_Prognosis_II: {
    duration: 30,
    cooldown: 0,
    type: 'partyShield',
    multiplier: 1
  },

  // SCH
  Protraction: { duration: 10, cooldown: 60, type: 'healing', multiplier: 1 },
  Sacred_Soil: { duration: 15, cooldown: 30, type: 'healing', multiplier: 0.9 },
  Expedient: { duration: 20, cooldown: 120, type: 'healing', multiplier: 0.9 },
  Fey_Illumination_sch: {
    duration: 20,
    cooldown: 120,
    type: 'healing',
    multiplier: 0.95
  },
  Deployment_Tactics: {
    duration: 30,
    cooldown: 90,
    type: 'partyShield',
    multiplier: 1
  },
  Seraphism: { duration: 20, cooldown: 180, type: 'healing', multiplier: 1 },
  Dissipation: { duration: 30, cooldown: 180, type: 'healing', multiplier: 1 },
  Consolation: {
    duration: 20,
    cooldown: 1,
    type: 'partyShield',
    multiplier: 1
  },
  Summon_Seraph: {
    duration: 22,
    cooldown: 120,
    type: 'healing',
    multiplier: 1
  },
  Succor: { duration: 30, cooldown: 0, type: 'partyShield', multiplier: 1 },

  // AST
  Celestial_Intersection: {
    duration: 0,
    cooldown: 20,
    type: 'healing',
    multiplier: 1
  },
  Exaltation: {
    duration: 8,
    cooldown: 60,
    type: 'singleMitigation',
    multiplier: 0.9
  },
  Celestial_Opposition: {
    duration: 15,
    cooldown: 60,
    type: 'healing',
    multiplier: 1
  },
  Collective_Unconscious: {
    duration: 10,
    cooldown: 60,
    type: 'healing',
    multiplier: 0.9
  },
  Earthly_Star: { duration: 20, cooldown: 60, type: 'healing', multiplier: 1 },
  Horoscope: { duration: 0, cooldown: 60, type: 'healing', multiplier: 1 },
  Macrocosmos: { duration: 15, cooldown: 180, type: 'healing', multiplier: 1 },
  Neutral_Sect: { duration: 20, cooldown: 120, type: 'healing', multiplier: 1 },
  Sun_Sign: { duration: 10, cooldown: 0, type: 'healing', multiplier: 0.9 },

  // WHM
  Aquaveil: {
    duration: 8,
    cooldown: 60,
    type: 'singleMitigation',
    multiplier: 0.9
  },
  Divine_Benison: { duration: 0, cooldown: 30, type: 'healing', multiplier: 1 },
  Asylum: { duration: 24, cooldown: 90, type: 'healing', multiplier: 1 },
  Temperance: { duration: 20, cooldown: 120, type: 'healing', multiplier: 0.9 },
  Liturgy_of_the_Bell: {
    duration: 20,
    cooldown: 180,
    type: 'healing',
    multiplier: 1
  },
  Divine_Caress: {
    duration: 30,
    cooldown: 1,
    type: 'partyShield',
    multiplier: 1
  },
  Plenary_Indulgence: {
    duration: 10,
    cooldown: 60,
    type: 'healing',
    multiplier: 0.9
  },

  // RPR
  Arcane_Crest: { duration: 0, cooldown: 30, type: 'healing', multiplier: 1 },

  // MNK
  Mantra: { duration: 15, cooldown: 120, type: 'healing', multiplier: 1 },

  // PCM
  Tempera_Coat: { duration: 15, cooldown: 60, type: 'healing', multiplier: 1 },
  Tempera_Grassa: {
    duration: 15,
    cooldown: 90,
    type: 'partyShield',
    multiplier: 1
  },

  //RDM
  Magick_Barrier: {
    duration: 10,
    cooldown: 90,
    type: 'healing',
    multiplier: 0.9
  },

  // BRD
  Troubadour: { duration: 15, cooldown: 90, type: 'healing', multiplier: 0.85 },
  Natures_Minne: {
    duration: 15,
    cooldown: 120,
    type: 'healing',
    multiplier: 1
  },

  // MCH
  Tactician: { duration: 15, cooldown: 90, type: 'healing', multiplier: 0.85 },
  Dismantle: { duration: 10, cooldown: 120, type: 'healing', multiplier: 0.9 },

  // DNC
  Shield_Samba: {
    duration: 15,
    cooldown: 90,
    type: 'healing',
    multiplier: 0.85
  },
  Curing_Waltz: { duration: 0, cooldown: 60, type: 'healing', multiplier: 1 },
  Improvisation: { duration: 0, cooldown: 120, type: 'healing', multiplier: 1 }
} as const
