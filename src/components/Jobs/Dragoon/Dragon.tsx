import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Dragoon = () => {
  return (
    <Jobs>
      <p>DRG</p>
      <SkillsRow>
        {jobSkills.DRG.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Dragoon
