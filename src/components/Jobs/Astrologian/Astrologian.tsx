import { jobSkills } from '../../Data/JobSkills'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Astrologian = () => {
  return (
    <Jobs>
      <p>AST</p>
      <SkillsRow>
        {jobSkills.AST.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Astrologian
