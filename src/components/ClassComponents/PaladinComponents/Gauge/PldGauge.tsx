import GaugeStance from '../../../../assets/paladin/PldGaugeTankStance.png'
import GaugeNonStance from '../../../../assets/paladin/PldGaugeNonTankStance.png'

import { PaladinState } from '../../../../Utils/types'
import { GaugeContainer, GaugeImg } from './styles'

interface Props {
  playerState: PaladinState
}

export default function PldGauge({ playerState }: Props) {
  return (
    <GaugeContainer>
      <GaugeImg src={GaugeStance} />
      <GaugeImg src={GaugeNonStance} />
    </GaugeContainer>
  )
}
