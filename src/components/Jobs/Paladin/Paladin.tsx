import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Paladin = () => {
  return (
    <Jobs>
      <p>PLD</p>
      <SkillsRow>
        {jobSkills.PLD.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Paladin
