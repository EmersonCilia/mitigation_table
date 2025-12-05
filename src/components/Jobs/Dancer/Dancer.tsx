import { jobSkills } from '../../Data/JobSkills'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Dancer = () => {
  return (
    <Jobs>
      <p>DNC</p>
      <SkillsRow>
        {jobSkills.DNC.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Dancer
