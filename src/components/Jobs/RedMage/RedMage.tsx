import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const RedMage = () => {
  return (
    <Jobs>
      <p>RDM</p>
      <SkillsRow>
        {jobSkills.RDM.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default RedMage
