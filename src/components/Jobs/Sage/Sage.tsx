import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Sage = () => {
  return (
    <Jobs>
      <p>SGE</p>
      <SkillsRow>
        {jobSkills.SGE.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Sage
