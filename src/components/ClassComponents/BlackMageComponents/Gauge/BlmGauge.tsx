import gaugeIce1 from '../../../../assets/BLM/gaugeice1.png'
import gaugeIce2 from '../../../../assets/BLM/gaugeice2.png'
import gaugeIce3 from '../../../../assets/BLM/gaugeice3.png'
import gaugeFire1 from '../../../../assets/BLM/gaugefire1.png'
import gaugeFire2 from '../../../../assets/BLM/gaugefire2.png'
import gaugeFire3 from '../../../../assets/BLM/gaugefire3.png'
import gaugeNoGauge from '../../../../assets/BLM/gaugenogauge.png'
import polyglot1 from '../../../../assets/BLM/polyglot1.png'
import polyglot2 from '../../../../assets/BLM/polyglot2.png'
import polyglot3 from '../../../../assets/BLM/polyglot3.png'
import gaugeparadox from '../../../../assets/BLM/gaugeparadox.png'
import umbralHeart1 from '../../../../assets/BLM/gaugeumbralheart1.png'
import umbralHeart2 from '../../../../assets/BLM/gaugeumbralheart2.png'
import umbralHeart3 from '../../../../assets/BLM/gaugeumbralheart3.png'
import gaugefix from '../../../../assets/BLM/gaugefix.png'
import { BlackMageState } from '../../../../Utils/types'

import { GaugeContainer, GaugeImg } from './styles'

export default function BlmGauge({
  playerState
}: {
  playerState: BlackMageState
}) {
  let Gauge
  let Polyglot
  let Paradox
  let UmbralHeart

  if (playerState.umbralIce === 1) {
    Gauge = gaugeIce1
  } else if (playerState.umbralIce === 2) {
    Gauge = gaugeIce2
  } else if (playerState.umbralIce === 3) {
    Gauge = gaugeIce3
  }
  if (playerState.astralFire === 1) {
    Gauge = gaugeFire1
  } else if (playerState.astralFire === 2) {
    Gauge = gaugeFire2
  } else if (playerState.astralFire === 3) {
    Gauge = gaugeFire3
  }
  if (playerState.astralFire === 0 && playerState.umbralIce === 0) {
    Gauge = gaugeNoGauge
  }
  if (playerState.polyglot === 1) {
    Polyglot = polyglot1
  } else if (playerState.polyglot === 2) {
    Polyglot = polyglot2
  } else if (playerState.polyglot === 3) {
    Polyglot = polyglot3
  }
  if (playerState.paradox === true) {
    Paradox = gaugeparadox
  }
  if (playerState.umbralHearts === 1) {
    UmbralHeart = umbralHeart1
  } else if (playerState.umbralHearts === 2) {
    UmbralHeart = umbralHeart2
  } else if (playerState.umbralHearts === 3) {
    UmbralHeart = umbralHeart3
  }
  return (
    <GaugeContainer>
      <GaugeImg src={Gauge} style={{ opacity: Gauge ? 1 : 0 }} />
      <GaugeImg src={Polyglot} style={{ opacity: Polyglot ? 1 : 0 }} />
      <GaugeImg src={Paradox} style={{ opacity: Paradox ? 1 : 0 }} />
      <GaugeImg src={UmbralHeart} style={{ opacity: UmbralHeart ? 1 : 0 }} />
      <GaugeImg src={gaugefix} />
    </GaugeContainer>
  )
}
