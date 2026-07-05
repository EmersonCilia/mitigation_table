import { Action, Downtime, ScholarState } from '../../../../Utils/types'
import Surecast from '../../BlackMageComponents/BLMButtons/Surecast'
import AddDowntime from '../../Buttons/Downtime'
import Wait from '../../Buttons/Wait'
import * as S from '../../Buttons/styles'
import Adloquium from '../ScholarButtons/Adloquium'
import Aetherflow from '../ScholarButtons/Aetherflow'
import ArtOfWar from '../ScholarButtons/Art_Of_War'
import Biolysis from '../ScholarButtons/Biolysis'
import Broil from '../ScholarButtons/Broil'
import Chain_Stratagem from '../ScholarButtons/Chain_Stratagem'
import DeploymentTactics from '../ScholarButtons/Deployment_Tactics'
import Dissipation from '../ScholarButtons/Dissipation'
import EmergencyTactics from '../ScholarButtons/Emergency_Tactics'
import EnergyDrain from '../ScholarButtons/Energy_Drain'
import Esuna from '../ScholarButtons/Esuna'
import Excogitation from '../ScholarButtons/Excogitation'
import Expedient from '../ScholarButtons/Excpedient'
import FeyBlessing from '../ScholarButtons/Fey_Blessing'
import FeyIllumination from '../ScholarButtons/Fey_Illumination'
import Indomitability from '../ScholarButtons/Indomitability'
import LucidDreaming from '../ScholarButtons/LucidDreaming'
import Lustrate from '../ScholarButtons/Lustrate'
import Protraction from '../ScholarButtons/Protaction'
import Recitation from '../ScholarButtons/Recitation'
import Rescue from '../ScholarButtons/Rescue'
import Ruin_II from '../ScholarButtons/RuinII'
import SacredSoil from '../ScholarButtons/Sacred_Soil'
import Seraphism from '../ScholarButtons/Seraphism'
import Sprint from '../ScholarButtons/Sprint'
import Succor from '../ScholarButtons/Succor'
import SummonSeraph from '../ScholarButtons/Summon_Seraph'
import Swiftcast from '../ScholarButtons/Swiftcast'
import WhisperingDawn from '../ScholarButtons/Whispering_Dawn'

interface Props {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  addDowntime: (downtime: Downtime) => void
  playerState: ScholarState
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
        <Broil
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Biolysis addSpell={addSpell} calculateGCD={calculateGCD} />
        <Ruin_II
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <ArtOfWar
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Adloquium
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Succor
          addSpell={addSpell}
          playerState={playerState}
          calculateGCD={calculateGCD}
        />
        <Aetherflow
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <EnergyDrain
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />

        <SacredSoil
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Indomitability
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Excogitation
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Lustrate
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Chain_Stratagem
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Dissipation
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Recitation
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <DeploymentTactics
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Seraphism
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />

        <WhisperingDawn
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />

        <FeyIllumination
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />

        <FeyBlessing
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <SummonSeraph
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <Expedient
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Protraction
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />

        <EmergencyTactics
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
          playerState={playerState}
        />
        <LucidDreaming
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Surecast
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Swiftcast
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Sprint
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Rescue
          addSpell={addSpell}
          action={action}
          rotationDuration={rotationDuration}
        />
        <Esuna addSpell={addSpell} calculateGCD={calculateGCD} />
      </S.Spells>
    </div>
  )
}
