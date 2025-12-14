import feint from '../../assets/Feint.png'
import addle from '../../assets/Addle.png'
import reprisal from '../../assets/Reprisal.png'
import rampart from '../../assets/Rampart.png'

import shieldSamba from '../../assets/dancer/Shield_Samba.png'
import curingWaltz from '../../assets/dancer/Curing_Waltz.png'
import improvisation from '../../assets/dancer/Improvisation.png'

import aquaveil from '../../assets/white_mage/Aquaveil.png'
import divineBenison from '../../assets/white_mage/Divine_Benison.png'
import asylum from '../../assets/white_mage/Asylum.png'
import temperance from '../../assets/white_mage/Temperance_(Ability).png'
import lotb from '../../assets/white_mage/Liturgy_of_the_Bell.png'
import divineCaress from '../../assets/white_mage/Divine_Caress.png'

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

import temperaCoat from '../../assets/picto/Tempera_Coat.png'
import temperaGrassa from '../../assets/picto/Tempera_Grassa.png'

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

import bloodwhetting from '../../assets/warrior/Bloodwhetting.png'
import damnation from '../../assets/warrior/Damnation.png'
import equilibrium from '../../assets/warrior/Equilibrium.png'
import holmgang from '../../assets/warrior/Holmgang.png'
import shakeItOff from '../../assets/warrior/Shake_It_Off.png'
import thrillOfBattle from '../../assets/warrior/Thrill_of_Battle.png'
import nascentFlash from '../../assets/warrior/Nascent_Flash.png'

import kerachole from '../../assets/sage/Kerachole.png'
import zoe from '../../assets/sage/Zoe.png'
import phisisII from '../../assets/sage/Physis_II.png'
import eukrasianPrognosis from '../../assets/sage/Eukrasian_Prognosis_II.png'
import philosophia from '../../assets/sage/Philosophia.png'
import panhaima from '../../assets/sage/Panhaima.png'
import haima from '../../assets/sage/Haima.png'
import pneuma from '../../assets/sage/Pneuma.png'
import holos from '../../assets/sage/Holos.png'
import taurochole from '../../assets/sage/Taurochole.png'

import celestialIntersection from '../../assets/astrologian/Celestial_Intersection.png'
import celestialOpposition from '../../assets/astrologian/Celestial_Opposition.png'
import collectiveUnconscious from '../../assets/astrologian/Collective_Unconscious.png'
import earthlyStar from '../../assets/astrologian/Earthly_Star.png'
import exaltation from '../../assets/astrologian/Exaltation.png'
import horoscope from '../../assets/astrologian/Horoscope.png'
import macrocosmos from '../../assets/astrologian/Macrocosmos.png'
import neutralSect from '../../assets/astrologian/Neutral_Sect.png'
import sunSign from '../../assets/astrologian/Sun_Sign.png'

import cover from '../../assets/paladin/Cover.png'
import bulwark from '../../assets/paladin/Bulwark.png'
import divineVeil from '../../assets/paladin/Divine_Veil.png'
import guardian from '../../assets/paladin/Guardian_action.png'
import hallowedGround from '../../assets/paladin/Hallowed_Ground.png'
import holySheltron from '../../assets/paladin/Holy_Sheltron.png'
import intervention from '../../assets/paladin/Intervention.png'
import passageOfArms from '../../assets/paladin/Passage_of_Arms.png'

import mantra from '../../assets/monk/Mantra.png'

import arcaneCrest from '../../assets/Reaper/Arcane_Crest.png'

import naturesMinne from '../../assets/bard/Natures_Minne.png'
import troubadour from '../../assets/bard/Troubadour.png'

import dismantle from '../../assets/machinist/Dismantle.png'
import tactician from '../../assets/machinist/Tactician.png'

import magickBarrier from '../../assets/red_mage/Magick_Barrier.png'

export type JobKey = keyof typeof jobSkills

export const allJobs: { id: string; job: JobKey }[] = [
  { id: '0', job: 'GNB' },
  { id: '1', job: 'DRK' },
  { id: '2', job: 'PLD' },
  { id: '3', job: 'WAR' },
  { id: '4', job: 'SGE' },
  { id: '5', job: 'SCH' },
  { id: '6', job: 'AST' },
  { id: '7', job: 'WHM' },
  { id: '8', job: 'VPR' },
  { id: '9', job: 'SAM' },
  { id: '10', job: 'NIN' },
  { id: '11', job: 'DRG' },
  { id: '12', job: 'RPR' },
  { id: '13', job: 'MNK' },
  { id: '14', job: 'PCM' },
  { id: '15', job: 'BLM' },
  { id: '16', job: 'SMN' },
  { id: '17', job: 'RDM' },
  { id: '18', job: 'DNC' },
  { id: '19', job: 'BRD' },
  { id: '20', job: 'MCH' }
]

export const jobSkills = {
  GNB: [
    { src: reprisal, alt: 'Reprisal', type: 'partyMitigation' },
    { src: heartOfLight, alt: 'Heart_of_Light', type: 'partyMitigation' },
    { src: rampart, alt: 'Rampart', type: 'singleMitigation' },
    { src: greatNebula, alt: 'Great_Nebula', type: 'singleMitigation' },
    { src: camouflage, alt: 'Camouflage', type: 'singleMitigation' },
    {
      src: heartOfCorundum,
      alt: 'Heart_of_Corundum',
      type: 'singleMitigation'
    },
    { src: superbolide, alt: 'Superbolide', type: 'invulnerability' }
  ],
  DRK: [
    { src: reprisal, alt: 'Reprisal', type: 'partyMitigation' },
    { src: darkMissionary, alt: 'Dark_Missionary', type: 'partyMitigation' },
    { src: rampart, alt: 'Rampart', type: 'singleMitigation' },
    { src: shadowedVigil, alt: 'Shadowed_Vigil', type: 'singleMitigation' },
    { src: darkMind, alt: 'Dark_Mind', type: 'singleMitigation' },
    { src: oblation, alt: 'Oblation', type: 'singleMitigation' },
    { src: tbn, alt: 'The_Blackest_Night', type: 'singleMitigation' },
    { src: livingDead, alt: 'Living_Dead', type: 'invulnerability' }
  ],
  PLD: [
    { src: reprisal, alt: 'Reprisal', type: 'partyMitigation' },
    { src: passageOfArms, alt: 'Passage_of_Arms', type: 'partyMitigation' },
    { src: divineVeil, alt: 'Divine_Veil', type: 'partyMitigation' },
    { src: rampart, alt: 'Rampart', type: 'singleMitigation' },
    { src: guardian, alt: 'Guardian', type: 'singleMitigation' },
    { src: bulwark, alt: 'Bulwark', type: 'singleMitigation' },
    { src: holySheltron, alt: 'Holy_Sheltron', type: 'singleMitigation' },
    { src: intervention, alt: 'Intervention', type: 'singleMitigation' },
    { src: cover, alt: 'Cover', type: 'singleMitigation' },
    { src: hallowedGround, alt: 'Hallowed_Ground', type: 'invulnerability' }
  ],
  WAR: [
    { src: reprisal, alt: 'Reprisal', type: 'partyMitigation' },
    { src: shakeItOff, alt: 'Shake_It_Off', type: 'partyMitigation' },
    { src: rampart, alt: 'Rampart', type: 'singleMitigation' },
    { src: damnation, alt: 'Damnation', type: 'singleMitigation' },
    { src: equilibrium, alt: 'Equilibrium', type: 'singleMitigation' },
    { src: thrillOfBattle, alt: 'Thrill_of_Battle', type: 'singleMitigation' },
    { src: bloodwhetting, alt: 'Bloodwhetting', type: 'singleMitigation' },
    { src: nascentFlash, alt: 'Nascent_Flash', type: 'singleMitigation' },
    { src: holmgang, alt: 'Holmgang', type: 'invulnerability' }
  ],
  SGE: [
    { src: kerachole, alt: 'Kerachole', type: 'partyMitigation' },
    { src: holos, alt: 'Holos', type: 'partyMitigation' },
    { src: panhaima, alt: 'Panhaima', type: 'partyMitigation' },
    { src: taurochole, alt: 'Taurochole', type: 'singleMitigation' },
    { src: haima, alt: 'Haima', type: 'singleMitigation' },
    { src: phisisII, alt: 'Phisis_II', type: 'healing' },
    { src: philosophia, alt: 'Philosophia', type: 'healing' },
    { src: zoe, alt: 'Zoe', type: 'healing' },
    { src: pneuma, alt: 'Pneuma', type: 'healing' },
    {
      src: eukrasianPrognosis,
      alt: 'Eukrasian_Prognosis_II',
      type: 'partyMitigation'
    }
  ],
  SCH: [
    { src: sacredSoil, alt: 'Sacred_Soil', type: 'partyMitigation' },
    { src: expedient, alt: 'Expedient', type: 'partyMitigation' },
    {
      src: feyIllumination,
      alt: 'Fey_Illumination_sch',
      type: 'partyMitigation'
    },
    {
      src: deploymentTactics,
      alt: 'Deployment_Tactics',
      type: 'partyMitigation'
    },
    { src: protraction, alt: 'Protraction', type: 'singleMitigation' },
    { src: seraphism, alt: 'Seraphism', type: 'healing' },
    { src: dissipation, alt: 'Dissipation', type: 'healing' },
    { src: consolation, alt: 'Consolation', type: 'healing' },
    { src: summonSeraph, alt: 'Summon_Seraph', type: 'healing' },
    { src: succor, alt: 'Succor', type: 'partyMitigation' }
  ],
  AST: [
    {
      src: collectiveUnconscious,
      alt: 'Collective_Unconscious',
      type: 'partyMitigation'
    },
    { src: neutralSect, alt: 'Neutral_Sect', type: 'partyMitigation' },
    { src: sunSign, alt: 'Sun_Sign', type: 'partyMitigation' },
    { src: exaltation, alt: 'Exaltation', type: 'singleMitigation' },
    {
      src: celestialIntersection,
      alt: 'Celestial_Intersection',
      type: 'singleMitigation'
    },
    { src: celestialOpposition, alt: 'Celestial_Opposition', type: 'healing' },
    { src: earthlyStar, alt: 'Earthly_Star', type: 'healing' },
    { src: horoscope, alt: 'Horoscope', type: 'healing' },
    { src: macrocosmos, alt: 'Macrocosmos', type: 'healing' }
  ],
  WHM: [
    { src: temperance, alt: 'Temperance', type: 'partyMitigation' },
    { src: divineCaress, alt: 'Divine_Caress', type: 'partyMitigation' },
    { src: aquaveil, alt: 'Aquaveil', type: 'singleMitigation' },
    { src: divineBenison, alt: 'Divine_Benison', type: 'singleMitigation' },
    { src: asylum, alt: 'Asylum', type: 'healing' },
    { src: lotb, alt: 'Liturgy_of_the_Bell', type: 'healing' }
  ],
  VPR: [{ src: feint, alt: 'Feint', type: 'partyMitigation' }],
  SAM: [{ src: feint, alt: 'Feint', type: 'partyMitigation' }],
  NIN: [{ src: feint, alt: 'Feint', type: 'partyMitigation' }],
  DRG: [{ src: feint, alt: 'Feint', type: 'partyMitigation' }],
  RPR: [
    { src: feint, alt: 'Feint', type: 'partyMitigation' },
    { src: arcaneCrest, alt: 'Arcane_Crest', type: 'singleMitigation' }
  ],
  MNK: [
    { src: feint, alt: 'Feint', type: 'partyMitigation' },
    { src: mantra, alt: 'Mantra', type: 'partyMitigation' }
  ],

  PCM: [
    { src: addle, alt: 'Addle', type: 'partyMitigation' },
    { src: temperaCoat, alt: 'Tempera_Coat', type: 'singleMitigation' },
    { src: temperaGrassa, alt: 'Tempera_Grassa', type: 'partyMitigation' }
  ],
  BLM: [{ src: addle, alt: 'Addle', type: 'partyMitigation' }],
  SMN: [{ src: addle, alt: 'Addle', type: 'partyMitigation' }],
  RDM: [
    { src: addle, alt: 'Addle', type: 'partyMitigation' },
    { src: magickBarrier, alt: 'Magick_Barrier', type: 'partyMitigation' }
  ],

  DNC: [
    { src: shieldSamba, alt: 'Shield_Samba', type: 'partyMitigation' },
    { src: curingWaltz, alt: 'Curing_Waltz', type: 'healing' },
    { src: improvisation, alt: 'Improvisation', type: 'healing' }
  ],
  BRD: [
    { src: troubadour, alt: 'Troubadour', type: 'partyMitigation' },
    { src: naturesMinne, alt: 'Natures_Minne', type: 'partyMitigation' }
  ],
  MCH: [
    { src: tactician, alt: 'Tactician', type: 'partyMitigation' },
    { src: dismantle, alt: 'Dismantle', type: 'partyMitigation' }
  ]
}
