import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const DarkKnight = () => {
  return (
    <Jobs>
      <p>DRK</p>
      <SkillsRow>
        {jobSkills.DRK.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default DarkKnight
