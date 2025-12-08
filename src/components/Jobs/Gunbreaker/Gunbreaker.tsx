import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Gunbreaker = () => {
  return (
    <Jobs>
      <p>GNB</p>
      <SkillsRow>
        {jobSkills.GNB.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Gunbreaker
