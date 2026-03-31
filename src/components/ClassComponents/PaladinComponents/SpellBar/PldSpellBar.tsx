import { Action, Downtime, PaladinState } from '../../../../Utils/types'
import AddDowntime from '../../Buttons/Downtime'
import Wait from '../../Buttons/Wait'
import Bulwark from '../PaladinButtons/Bulwark'
import Cover from '../PaladinButtons/Cover'
import DivineVeil from '../PaladinButtons/DivineVeil'
import FastBlade from '../PaladinButtons/Fast_Blade'
import Guardian from '../PaladinButtons/Guardian'
import HallowedGround from '../PaladinButtons/Hallowed_Ground'
import HolySheltron from '../PaladinButtons/Holy_Sheltron'
import PassageofArms from '../PaladinButtons/Passage_of_Arms'
import Rampart from '../PaladinButtons/Rampart'
import Reprisal from '../PaladinButtons/Reprisal'
import RiotBlade from '../PaladinButtons/Riot_Blade'
import RoyalAuthority from '../PaladinButtons/Royal_Authority'
import * as S from '../../Buttons/styles'
import HolySpirit from '../PaladinButtons/Holy_Spirit'
import Confliteor from '../PaladinButtons/Confliteor'
import Intervene from '../PaladinButtons/Intervene'
import TotalEclipse from '../PaladinButtons/Total_Eclipse'
import Prominence from '../PaladinButtons/Prominence'
import GoringBlade from '../PaladinButtons/Goring_Blade'
import HolyCircle from '../PaladinButtons/Holy_Circle'
import ShieldBash from '../PaladinButtons/Shield_Bash'
import ShieldLob from '../PaladinButtons/Shield_Lob'
import CircleOfScorn from '../PaladinButtons/Circle_of_Scorn'
import Expiacion from '../PaladinButtons/Expiacion'
import Imperator from '../PaladinButtons/Imperator'
import Intervention from '../PaladinButtons/Intervention'
import Clemency from '../PaladinButtons/Clemency'
import IronWill from '../PaladinButtons/Iron_Will'
import Provoke from '../PaladinButtons/Provoke'
import Shirk from '../PaladinButtons/Shirk'
import Interject from '../PaladinButtons/Interject'
import LowBlow from '../PaladinButtons/Low_Blow'
import ArmsLenght from '../PaladinButtons/Arms_Lenght'
import Sprint from '../PaladinButtons/Sprint'
import FightorFlight from '../PaladinButtons/Fight_Or_Flight'
import AtonementCombo from '../PaladinButtons/AtonementCombo'

interface Props {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  addDowntime: (downtime: Downtime) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
  rotationDuration: number
  action: Action[]
}

export default function PldSpellBar({
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
        <FastBlade
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <RiotBlade
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <RoyalAuthority
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HolySpirit addSpell={addSpell} playerState={playerState} />
        <TotalEclipse
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Prominence
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HolyCircle addSpell={addSpell} playerState={playerState} />
        <AtonementCombo
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <FightorFlight
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <GoringBlade
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Imperator
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Confliteor addSpell={addSpell} playerState={playerState} />
        <CircleOfScorn
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Expiacion
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Intervene
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <ShieldLob
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HolySheltron
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Rampart
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Bulwark
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Guardian
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <HallowedGround
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Reprisal
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <DivineVeil
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <PassageofArms
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Cover
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Intervention
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />
        <Clemency addSpell={addSpell} playerState={playerState} />

        <ShieldBash
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <IronWill
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
          playerState={playerState}
        />

        <Provoke
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Shirk
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Sprint
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Interject
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <LowBlow
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <ArmsLenght
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
      </S.Spells>
    </div>
  )
}
