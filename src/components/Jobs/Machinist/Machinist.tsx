import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Machinist = () => {
  return (
    <Jobs>
      <p>MCH</p>
      <SkillsRow>
        {jobSkills.MCH.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Machinist
