import addle from '../../../assets/Addle.png'
import temperaCoat from '../../../assets/picto/Tempera_Coat.png'
import temperaGrassa from '../../../assets/picto/Tempera_Grassa.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Pictomancer = () => {
  return (
    <Jobs>
      <p>PCM</p>
      <SkillsRow>
        <JobSkills src={addle} alt="Addle" />
        <JobSkills src={temperaCoat} alt="Tempera_Coat" />
        <JobSkills src={temperaGrassa} alt="Tempera_Grassa" />
      </SkillsRow>
    </Jobs>
  )
}

export default Pictomancer
