import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const WhiteMage = () => {
  return (
    <Jobs>
      <p>WHM</p>
      <SkillsRow>
        {jobSkills.WHM.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default WhiteMage
