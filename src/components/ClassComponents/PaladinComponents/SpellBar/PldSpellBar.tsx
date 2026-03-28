import { Action, Downtime, PaladinState } from '../../../../Utils/types'
import AddDowntime from '../../Buttons/Downtime'
import Wait from '../../Buttons/Wait'
import Atonement from '../PaladinButtons/Atonement'
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
import Sepulchre from '../PaladinButtons/Sepulchre'
import Supplication from '../PaladinButtons/Supplication'
import * as S from '../../Buttons/styles'
import HolySpirit from '../PaladinButtons/Holy_Spirit'
import BladeOfFaith from '../PaladinButtons/Blade_of_Faith'
import BladeOfTruth from '../PaladinButtons/Blade_of_Truth'
import BladeOfHonor from '../PaladinButtons/Blade_of_Honor'
import BladeOfValor from '../PaladinButtons/Blade_of_Valor'
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
import ReleaseIronWill from '../PaladinButtons/Release_Iron_Will'
import Provoke from '../PaladinButtons/Provoke'
import Shirk from '../PaladinButtons/Shirk'
import Interject from '../PaladinButtons/Interject'
import LowBlow from '../PaladinButtons/Low_Blow'
import ArmsLenght from '../PaladinButtons/Arms_Lenght'
import Sprint from '../PaladinButtons/Sprint'
import FightorFlight from '../PaladinButtons/FightOrFlight'

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
        <DivineVeil
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Rampart
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Cover
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
        <HolySheltron
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <PassageofArms
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Reprisal
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
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
        <Atonement
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Supplication
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Sepulchre
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HolySpirit
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Confliteor
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <BladeOfFaith
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <BladeOfTruth
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />

        <BladeOfValor
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <BladeOfHonor
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Intervene
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
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
        <GoringBlade
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <HolyCircle
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <ShieldBash
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <ShieldLob
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <CircleOfScorn
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Expiacion
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Imperator
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Intervention
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <Clemency
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <IronWill
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <ReleaseIronWill
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
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
        <Sprint
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
        <FightorFlight
          addSpell={addSpell}
          rotationDuration={rotationDuration}
          action={action}
        />
      </S.Spells>
    </div>
  )
}
