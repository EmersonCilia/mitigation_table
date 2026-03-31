import GaugeStance from '../../../../assets/paladin/PldGaugeTankStance.png'
import GaugeNonStance from '../../../../assets/paladin/PldGaugeNonTankStance.png'

import { PaladinState } from '../../../../Utils/types'
import { GaugeContainer, GaugeImg, GaugeNumber } from './styles'

interface Props {
  playerState: PaladinState
}

export default function PldGauge({ playerState }: Props) {
  return (
    <GaugeContainer>
      <GaugeImg
        src={GaugeStance}
        style={{ opacity: playerState.ironWill ? 1 : 0 }}
      />
      <GaugeImg
        src={GaugeNonStance}
        style={{ opacity: playerState.ironWill === false ? 1 : 0 }}
      />
      <GaugeNumber>{playerState.oath}</GaugeNumber>
    </GaugeContainer>
  )
}
