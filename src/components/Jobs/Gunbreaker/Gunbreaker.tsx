import reprisal from '../../../assets/Reprisal.png'
import rampart from '../../../assets/Rampart.png'
import heartOfCorundum from '../../../assets/gunbreaker/Heart_of_Corundum.png'
import greatNebula from '../../../assets/gunbreaker/Great_Nebula.png'
import camouflage from '../../../assets/gunbreaker/Camouflage.png'
import superbolide from '../../../assets/gunbreaker/Superbolide.png'
import heartOfLight from '../../../assets/gunbreaker/Heart_of_Light.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const Gunbreaker = () => {
  return (
    <Jobs>
      <p>GNB</p>
      <SkillsRow>
        <JobSkills src={reprisal} alt="Reprisal" />
        <JobSkills src={rampart} alt="Rampart" />
        <JobSkills src={heartOfCorundum} alt="Heart_of_Corundum" />
        <JobSkills src={greatNebula} alt="Great_Nebula" />
        <JobSkills src={camouflage} alt="Camouflage" />
        <JobSkills src={superbolide} alt="Superbolide" />
        <JobSkills src={heartOfLight} alt="Heart_of_Light" />
      </SkillsRow>
    </Jobs>
  )
}

export default Gunbreaker
