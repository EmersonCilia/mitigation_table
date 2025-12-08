import { Jobs, JobSkills, SkillsRow } from '../../../styles'
import { jobSkills } from '../../Data/JobSkills'

const Pictomancer = () => {
  return (
    <Jobs>
      <p>PCM</p>
      <SkillsRow>
        {jobSkills.PCM.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Pictomancer
