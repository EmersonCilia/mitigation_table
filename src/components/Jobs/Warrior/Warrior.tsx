import { jobSkills } from '../../Data/JobSkills'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Warrior = () => {
  return (
    <Jobs>
      <p>WAR</p>
      <SkillsRow>
        {jobSkills.WAR.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Warrior
