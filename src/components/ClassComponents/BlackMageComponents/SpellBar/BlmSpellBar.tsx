import BlizzardIII from '../BLMButtons/BlizzardIII'
import FireIV from '../BLMButtons/FireIV'
import Transpose from '../BLMButtons/Transpose'
import type { Action, Downtime, BlackMageState } from '../../../../Utils/types'
import FireIII from '../BLMButtons/FireIII'
import BlizzardIV from '../BLMButtons/BlizzardIV'
import Paradox from '../BLMButtons/Paradox'
import Xenoglossy from '../BLMButtons/Xenoglossy'
import Despair from '../BLMButtons/Despair'
import FlareStar from '../BLMButtons/FlareStar'
import HighThunder from '../BLMButtons/HighThunder'
import Wait from '../../Buttons/Wait'
import AddDowntime from '../../Buttons/Downtime'
import * as S from '../../Buttons/styles'
import Flare from '../BLMButtons/Flare'
import Amplifier from '../BLMButtons/Amplifier'
import AetherialManipulation from '../BLMButtons/AetherialManipulation'
import BetweenTheLines from '../BLMButtons/BetweenTheLines'
import Foul from '../BLMButtons/Foul'
import Freeze from '../BLMButtons/Freeze'
import HighBlizzardII from '../BLMButtons/HighBlizzardII'
import HighThunderII from '../BLMButtons/HighThuderII'
import UmbralSoul from '../BLMButtons/UmbralSoul'
import Manafont from '../BLMButtons/Manafont'
import Manaward from '../BLMButtons/Manaward'
import LeyLines from '../BLMButtons/LeyLines'
import Retrace from '../BLMButtons/Retrace'
import Triplecast from '../BLMButtons/Triplecast'
import HighFireII from '../BLMButtons/HighFireII'
import Swiftcast from '../BLMButtons/Swiftcast'
import LucidDreaming from '../BLMButtons/LucidDreaming'
import Addle from '../BLMButtons/Addle'
import Surecast from '../BLMButtons/Surecast'

interface Props {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  addDowntime: (downtime: Downtime) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
  rotationDuration: number
  action: Action[]
}

export default function BlmSpellBar({
  addSpell,
  addDowntime,
  playerState,
  calculateGCD,
  rotationDuration,
  action
}: Props) {
  return (
    <div>
      <Wait addSpell={addSpell} />
      <AddDowntime addDowntime={addDowntime} />
      <S.Spells>
        <BlizzardIII
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <BlizzardIV
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HighBlizzardII
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Freeze
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <FireIII
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <FireIV
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HighFireII
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <FlareStar
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HighThunder
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HighThunderII
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Despair
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Flare
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Xenoglossy
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Foul
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Paradox
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <UmbralSoul
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Transpose
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <LeyLines
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Amplifier
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Manafont
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <AetherialManipulation
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <BetweenTheLines
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Retrace
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Manaward
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Triplecast
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Swiftcast
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Surecast
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <LucidDreaming
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Addle
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
      </S.Spells>
    </div>
  )
}
