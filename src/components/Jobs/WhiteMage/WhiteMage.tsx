import aquaveil from '../../../assets/white_mage/Aquaveil.png'
import divineBenison from '../../../assets/white_mage/Divine_Benison.png'
import asylum from '../../../assets/white_mage/Asylum.png'
import temperance from '../../../assets/white_mage/Temperance_(Ability).png'
import lotb from '../../../assets/white_mage/Liturgy_of_the_Bell.png'
import divineCaress from '../../../assets/white_mage/Divine_Caress.png'
import { Jobs, JobSkills, SkillsRow } from '../../../styles'

const WhiteMage = () => {
  return (
    <Jobs>
      <p>WHM</p>
      <SkillsRow>
        <JobSkills src={aquaveil} alt="Aquaveil" />
        <JobSkills src={divineBenison} alt="Divine_Benison" />
        <JobSkills src={asylum} alt="Asylum" />
        <JobSkills src={temperance} alt="Temperance" />
        <JobSkills src={lotb} alt="Liturgy_of_the_Bell" />
        <JobSkills src={divineCaress} alt="Divine_Caress" />
      </SkillsRow>
    </Jobs>
  )
}

export default WhiteMage
