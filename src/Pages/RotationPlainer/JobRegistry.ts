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
  }
}

export type Job = keyof typeof jobRegistry
