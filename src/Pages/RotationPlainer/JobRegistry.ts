//BLM
import BlmSpellBar from '../../components/ClassComponents/BlackMageComponents/SpellBar/BlmSpellBar'
import BLMGauge from '../../components/ClassComponents/BlackMageComponents/Gauge/BlmGauge'
import { simulate } from '../../components/ClassComponents/BlackMageComponents/blackMageSimulation'
import { BlackMageState } from '../../Utils/types'

//PLD
import PldGauge from '../../components/ClassComponents/PaladinComponents/Gauge/PldGauge'
import PldSpellBar from '../../components/ClassComponents/PaladinComponents/SpellBar/PldSpellBar'
import { Pldsimulate } from '../../components/ClassComponents/PaladinComponents/paladinSimulation'
import { PaladinState } from '../../Utils/types'

//SCH
import SchSPellBar from '../../components/ClassComponents/ScholarComponents/SpellBar/SchSpellBar'
import { Schsimulate } from '../../components/ClassComponents/ScholarComponents/scholarSimulation'
import { ScholarState } from '../../Utils/types'

export const jobRegistry = {
  BLM: {
    SpellBarComponent: BlmSpellBar,
    GaugeComponent: BLMGauge,
    simulate: simulate,
    stateType: {} as BlackMageState
  },
  PLD: {
    SpellBarComponent: PldSpellBar,
    GaugeComponent: PldGauge,
    simulate: Pldsimulate,
    stateType: {} as PaladinState
  },
  SCH: {
    SpellBarComponent: SchSPellBar,
    GaugeComponent: PldGauge,
    simulate: Schsimulate,
    stateType: {} as ScholarState
  }
}

export type Job = keyof typeof jobRegistry
