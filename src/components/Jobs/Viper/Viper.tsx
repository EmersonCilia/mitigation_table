import feint from '../../../assets/Feint.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Viper = () => {
  return (
    <Jobs>
      <p>VPR</p>
      <SkillsRow>
        <JobSkills src={feint} alt="Feint" />
      </SkillsRow>
    </Jobs>
  )
}

export default Viper
