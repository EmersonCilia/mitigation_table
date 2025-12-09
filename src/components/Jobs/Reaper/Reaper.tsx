import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Reaper = () => {
  return (
    <Jobs>
      <p>RPR</p>
      <SkillsRow>
        {jobSkills.RPR.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Reaper
