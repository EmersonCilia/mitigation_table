import BlizzardIII from '../Buttons/BlizzardIII'
import FireIV from '../Buttons/FireIV'
import Transpose from '../Buttons/Transpose'
import type { Action, Downtime, PlayerState } from '../../Utils/types'
import FireIII from '../Buttons/FireIII'
import BlizzardIV from '../Buttons/BlizzardIV'
import Paradox from '../Buttons/Paradox'
import Xenoglossy from '../Buttons/Xenoglossy'
import Despair from '../Buttons/Despair'
import FlareStar from '../Buttons/FlareStar'
import HighThunder from '../Buttons/HighThunder'
import Wait from '../Buttons/Wait'
import AddDowntime from '../Buttons/Downtime'
import * as S from './styles'
import Flare from '../Buttons/Flare'
import Amplifier from '../Buttons/Amplifier'
import AetherialManipulation from '../Buttons/AetherialManipulation'
import BetweenTheLines from '../Buttons/BetweenTheLines'
import Foul from '../Buttons/Foul'
import Freeze from '../Buttons/Freeze'
import HighBlizzardII from '../Buttons/HighBlizzardII'
import HighThunderII from '../Buttons/HighThuderII'
import UmbralSoul from '../Buttons/UmbralSoul'
import Manafont from '../Buttons/Manafont'
import Manaward from '../Buttons/Manaward'
import LeyLines from '../Buttons/LeyLines'
import Retrace from '../Buttons/Retrace'
import Triplecast from '../Buttons/Triplecast'
import HighFireII from '../Buttons/HighFireII'
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
