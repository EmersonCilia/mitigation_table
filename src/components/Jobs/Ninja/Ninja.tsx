import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Ninja = () => {
  return (
    <Jobs>
      <p>NIN</p>
      <SkillsRow>
        {jobSkills.NIN.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Ninja
