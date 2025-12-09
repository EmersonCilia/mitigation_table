import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Summoner = () => {
  return (
    <Jobs>
      <p>SMN</p>
      <SkillsRow>
        {jobSkills.SMN.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Summoner
