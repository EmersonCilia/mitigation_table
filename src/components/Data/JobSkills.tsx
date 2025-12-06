import shieldSamba from '../../assets/dancer/Shield_Samba.png'
import curingWaltz from '../../assets/dancer/Curing_Waltz.png'
import improvisation from '../../assets/dancer/Improvisation.png'
import aquaveil from '../../assets/white_mage/Aquaveil.png'
import divineBenison from '../../assets/white_mage/Divine_Benison.png'
import asylum from '../../assets/white_mage/Asylum.png'
import temperance from '../../assets/white_mage/Temperance_(Ability).png'
import lotb from '../../assets/white_mage/Liturgy_of_the_Bell.png'
import divineCaress from '../../assets/white_mage/Divine_Caress.png'
import feint from '../../assets/Feint.png'
import protraction from '../../assets/scholar/Protraction.png'
import consolation from '../../assets/scholar/Consolation.png'
import deploymentTactics from '../../assets/scholar/Deployment_Tactics.png'
import dissipation from '../../assets/scholar/Dissipation.png'
import expedient from '../../assets/scholar/Expedient.png'
import feyIllumination from '../../assets/scholar/Fey_Illumination-sch.png'
import sacredSoil from '../../assets/scholar/Sacred_Soil.png'
import seraphism from '../../assets/scholar/Seraphism.png'
import succor from '../../assets/scholar/Succor.png'
import summonSeraph from '../../assets/scholar/Summon_Seraph.png'
import addle from '../../assets/Addle.png'
import temperaCoat from '../../assets/picto/Tempera_Coat.png'
import temperaGrassa from '../../assets/picto/Tempera_Grassa.png'
import reprisal from '../../assets/Reprisal.png'
import rampart from '../../assets/Rampart.png'
import heartOfCorundum from '../../assets/gunbreaker/Heart_of_Corundum.png'
import greatNebula from '../../assets/gunbreaker/Great_Nebula.png'
import camouflage from '../../assets/gunbreaker/Camouflage.png'
import superbolide from '../../assets/gunbreaker/Superbolide.png'
import heartOfLight from '../../assets/gunbreaker/Heart_of_Light.png'
import oblation from '../../assets/dark_knight/Oblation.png'
import darkMind from '../../assets/dark_knight/Dark_Mind.png'
import shadowedVigil from '../../assets/dark_knight/Shadowed_Vigil.png'
import tbn from '../../assets/dark_knight/The_Blackest_Night.png'
import livingDead from '../../assets/dark_knight/Living_Dead.png'
import darkMissionary from '../../assets/dark_knight/Dark_Missionary.png'

export const jobSkills = {
  GNB: [
    { src: { reprisal }, alt: 'Reprisal-GNB' },
    { src: { rampart }, alt: 'Rampart-GNB' },
    { src: { heartOfCorundum }, alt: 'Heart_of_Corundum' },
    { src: { greatNebula }, alt: 'Great_Nebula' },
    { src: { camouflage }, alt: 'Camouflage' },
    { src: { superbolide }, alt: 'Superbolide' },
    { src: { heartOfLight }, alt: 'Heart_of_Light' }
  ],
  DRK: [
    { src: { reprisal }, alt: 'Reprisal-DRK' },
    { src: { rampart }, alt: 'Rampart-DRK' },
    { src: { oblation }, alt: 'Oblation' },
    { src: { darkMind }, alt: 'Dark_Mind' },
    { src: { shadowedVigil }, alt: 'Shadowed_Vigil' },
    { src: { tbn }, alt: 'The_Blackest_Night' },
    { src: { livingDead }, alt: 'Living_Dead' },
    { src: { darkMissionary }, alt: 'Dark_Missionary' }
  ],

  SCH: [
    { src: { protraction }, alt: 'Protraction' },
    { src: { consolation }, alt: 'Consolation' },
    { src: { deploymentTactics }, alt: 'Deployment_Tactics' },
    { src: { dissipation }, alt: 'Dissipation' },
    { src: { expedient }, alt: 'Expedient' },
    { src: { feyIllumination }, alt: 'Fey_Illumination_sch' },
    { src: { sacredSoil }, alt: 'Sacred_Soil' },
    { src: { seraphism }, alt: 'Seraphism' },
    { src: { succor }, alt: 'Succor' },
    { src: { summonSeraph }, alt: 'Summon_Seraph' }
  ],
  WHM: [
    { src: { aquaveil }, alt: 'Aquaveil' },
    { src: { divineBenison }, alt: 'Divine_Benison' },
    { src: { asylum }, alt: 'Asylum' },
    { src: { temperance }, alt: 'Temperance' },
    { src: { lotb }, alt: 'Liturgy_of_the_Bell' },
    { src: { divineCaress }, alt: 'Divine_Caress' }
  ],
  VPR: [{ src: { feint }, alt: 'Feint-VPR' }],
  SAM: [{ src: { feint }, alt: 'Feint-SAM' }],

  PCM: [
    { src: { addle }, alt: 'Addle' },
    { src: { temperaCoat }, alt: 'Tempera_Coat' },
    { src: { temperaGrassa }, alt: 'Tempera_Grassa' }
  ],

  DNC: [
    { src: shieldSamba, alt: 'Shield_Samba' },
    { src: curingWaltz, alt: 'Curing_Waltz' },
    { src: improvisation, alt: 'Improvisation' }
  ]
}
