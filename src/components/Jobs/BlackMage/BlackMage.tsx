import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const BlackMage = () => {
  return (
    <Jobs>
      <p>BLM</p>
      <SkillsRow>
        {jobSkills.BLM.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default BlackMage
