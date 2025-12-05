import reprisal from '../../../assets/Reprisal.png'
import rampart from '../../../assets/Rampart.png'
import oblation from '../../../assets/dark_knight/Oblation.png'
import darkMind from '../../../assets/dark_knight/Dark_Mind.png'
import shadowedVigil from '../../../assets/dark_knight/Shadowed_Vigil.png'
import tbn from '../../../assets/dark_knight/The_Blackest_Night.png'
import livingDead from '../../../assets/dark_knight/Living_Dead.png'
import darkMissionary from '../../../assets/dark_knight/Dark_Missionary.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const DarkKnight = () => {
  return (
    <Jobs>
      <p>DRK</p>
      <SkillsRow>
        <JobSkills src={reprisal} alt="Reprisal" />
        <JobSkills src={rampart} alt="Rampart" />
        <JobSkills src={oblation} alt="Oblation" />
        <JobSkills src={darkMind} alt="Dark_Mind" />
        <JobSkills src={shadowedVigil} alt="Shadowed_Vigil" />
        <JobSkills src={tbn} alt="The_Blackest_Night" />
        <JobSkills src={livingDead} alt="Living_Dead" />
        <JobSkills src={darkMissionary} alt="Dark_Missionary" />
      </SkillsRow>
    </Jobs>
  )
}

export default DarkKnight
