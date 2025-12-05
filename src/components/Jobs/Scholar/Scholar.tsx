import protraction from '../../../assets/scholar/Protraction.png'
import consolation from '../../../assets/scholar/Consolation.png'
import deploymentTactics from '../../../assets/scholar/Deployment_Tactics.png'
import dissipation from '../../../assets/scholar/Dissipation.png'
import expedient from '../../../assets/scholar/Expedient.png'
import feyIllumination from '../../../assets/scholar/Fey_Illumination-sch.png'
import sacredSoil from '../../../assets/scholar/Sacred_Soil.png'
import seraphism from '../../../assets/scholar/Seraphism.png'
import succor from '../../../assets/scholar/Succor.png'
import summonSeraph from '../../../assets/scholar/Summon_Seraph.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Scholar = () => {
  return (
    <Jobs>
      <p>SCH</p>
      <SkillsRow>
        <JobSkills src={protraction} alt="Protraction" />
        <JobSkills src={consolation} alt="Consolation" />
        <JobSkills src={deploymentTactics} alt="Deployment_Tactics" />
        <JobSkills src={dissipation} alt="Dissipation" />
        <JobSkills src={expedient} alt="Expedient" />
        <JobSkills src={feyIllumination} alt="Fey_Illumination_sch" />
        <JobSkills src={sacredSoil} alt="Sacred_Soil" />
        <JobSkills src={seraphism} alt="Seraphism" />
        <JobSkills src={succor} alt="Succor" />
        <JobSkills src={summonSeraph} alt="Summon_Seraph" />
      </SkillsRow>
    </Jobs>
  )
}

export default Scholar
