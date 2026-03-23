import BlizzardIII from '../Buttons/BLMButtons/BlizzardIII'
import FireIV from '../Buttons/BLMButtons/FireIV'
import Transpose from '../Buttons/BLMButtons/Transpose'
import type { Action, Downtime, PlayerState } from '../../Utils/types'
import FireIII from '../Buttons/BLMButtons/FireIII'
import BlizzardIV from '../Buttons/BLMButtons/BlizzardIV'
import Paradox from '../Buttons/BLMButtons/Paradox'
import Xenoglossy from '../Buttons/BLMButtons/Xenoglossy'
import Despair from '../Buttons/BLMButtons/Despair'
import FlareStar from '../Buttons/BLMButtons/FlareStar'
import HighThunder from '../Buttons/BLMButtons/HighThunder'
import Wait from '../Buttons/Wait'
import AddDowntime from '../Buttons/Downtime'
import * as S from './styles'
import Flare from '../Buttons/BLMButtons/Flare'
import Amplifier from '../Buttons/BLMButtons/Amplifier'
import AetherialManipulation from '../Buttons/BLMButtons/AetherialManipulation'
import BetweenTheLines from '../Buttons/BLMButtons/BetweenTheLines'
import Foul from '../Buttons/BLMButtons/Foul'
import Freeze from '../Buttons/BLMButtons/Freeze'
import HighBlizzardII from '../Buttons/BLMButtons/HighBlizzardII'
import HighThunderII from '../Buttons/BLMButtons/HighThuderII'
import UmbralSoul from '../Buttons/BLMButtons/UmbralSoul'
import Manafont from '../Buttons/BLMButtons/Manafont'
import Manaward from '../Buttons/BLMButtons/Manaward'
import LeyLines from '../Buttons/BLMButtons/LeyLines'
import Retrace from '../Buttons/BLMButtons/Retrace'
import Triplecast from '../Buttons/BLMButtons/Triplecast'
import HighFireII from '../Buttons/BLMButtons/HighFireII'
import Swiftcast from '../Buttons/Swiftcast'
import LucidDreaming from '../Buttons/LucidDreaming'
import Addle from '../Buttons/Addle'
import Surecast from '../Buttons/Surecast'

interface Props {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  addDowntime: (downtime: Downtime) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
  rotationDuration: number
  action: Action[]
}

export default function SpellBar({
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
