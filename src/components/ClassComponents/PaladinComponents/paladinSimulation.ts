import { Action, PaladinState, SimulationResult } from '../../../Utils/types'

const initialState: PaladinState = {
  mana: 10000,
  oath: 0,
  confliteorReady: 0,
  requiescat: 0,
  divineMight: 0,
  atonementReady: 0,
  supplicationReady: 0,
  sepulchreReady: 0,
  bladeOfHonorReady: 0,
  goringBladeReady: 0,
  fightOrFlight: 0,
  riotBladeReady: 0,
  royalAuthrityReady: 0,
  bladeOfValorReady: 0,
  bladeOfFaithReady: 0,
  bladeOfTruthReady: 0,
  prominenceReady: 0,
  ironWill: false,
  oathTimer: 2.23,
  circleOfScornDuration: 0,
  circleOfScornDotPotency: 0,
  circleOfScornTIckTimer: 0
}

function updateOath(
  state: PaladinState,
  deltaTime: number,
  currentTime: number,
  isDuringDowntime: (time: number) => boolean
) {
  if (!isDuringDowntime(currentTime)) {
    state.oathTimer += deltaTime
  }
  let autoAttacks = 0

  while (state.oathTimer >= 2.24) {
    state.oathTimer -= 2.24
    state.oath = Math.min(100, state.oath + 5)
    autoAttacks++
  }
  return autoAttacks
}
function applySpell(state: PaladinState, spell: Action): PaladinState {
  const newState = { ...state }
  switch (spell.name) {
    case 'Clemency': {
      newState.mana -= 2000
      if (newState.requiescat > 0) {
        newState.requiescat -= 1
      }
      break
    }
    case 'Fight_or_Flight': {
      newState.goringBladeReady = 30
      newState.fightOrFlight = 20
      break
    }
    case 'Imperator': {
      newState.requiescat = 4
      newState.confliteorReady = 30
      break
    }
    case 'Fast_Blade': {
      newState.riotBladeReady = 30
      newState.royalAuthrityReady = 0
      newState.bladeOfFaithReady = 0
      newState.bladeOfTruthReady = 0
      newState.bladeOfValorReady = 0
      break
    }
    case 'Riot_Blade': {
      if (newState.riotBladeReady > 0) {
        newState.royalAuthrityReady = 30
      }
      if (newState.riotBladeReady <= 0) {
        newState.royalAuthrityReady = 0
      }
      newState.riotBladeReady = 0
      newState.bladeOfFaithReady = 0
      newState.bladeOfTruthReady = 0
      newState.bladeOfValorReady = 0

      break
    }
    case 'Royal_Authority': {
      if (newState.royalAuthrityReady > 0) {
        newState.divineMight = 30
        newState.royalAuthrityReady = 0
        newState.atonementReady = 30
        newState.supplicationReady = 0
        newState.sepulchreReady = 0
      }
      newState.riotBladeReady = 0
      newState.bladeOfFaithReady = 0
      newState.bladeOfTruthReady = 0
      newState.bladeOfValorReady = 0
      break
    }
    case 'Atonement': {
      newState.supplicationReady = 30
      newState.atonementReady = 0
      break
    }
    case 'Supplication': {
      newState.supplicationReady = 0
      newState.sepulchreReady = 30
      break
    }
    case 'Sepulchre': {
      newState.sepulchreReady = 0
      break
    }
    case 'Confliteor': {
      newState.bladeOfFaithReady = 30
      newState.confliteorReady = 0
      if (newState.requiescat > 0) {
        newState.requiescat--
      }
      break
    }
    case 'Blade_of_Faith': {
      newState.bladeOfTruthReady = 30
      newState.bladeOfFaithReady = 0
      if (newState.requiescat > 0) {
        newState.requiescat--
      }
      break
    }
    case 'Blade_of_Truth': {
      newState.bladeOfTruthReady = 0
      newState.bladeOfValorReady = 30
      if (newState.requiescat > 0) {
        newState.requiescat--
      }
      break
    }
    case 'Blade_of_Valor': {
      newState.bladeOfValorReady = 0
      newState.bladeOfHonorReady = 30
      if (newState.requiescat > 0) {
        newState.requiescat--
      }
      break
    }
    case 'Blade_of_Honor': {
      newState.bladeOfHonorReady = 0
      break
    }
    case 'Holy_Circle':
    case 'Holy_Spirit': {
      if (newState.requiescat > 0 && newState.divineMight <= 0) {
        newState.requiescat--
      }
      if (newState.divineMight > 0) {
        newState.divineMight = 0
      }
      if (newState.divineMight <= 0 && newState.requiescat <= 0) {
        newState.oathTimer -= 1
      }
      break
    }
    case 'Goring_Blade': {
      newState.goringBladeReady = 0
      break
    }
    case 'Total_Eclipse': {
      newState.prominenceReady = 30
      newState.riotBladeReady = 0
      newState.royalAuthrityReady = 0
      newState.bladeOfValorReady = 0
      newState.bladeOfFaithReady = 0
      newState.bladeOfTruthReady = 0
      break
    }
    case 'Prominence': {
      if (newState.prominenceReady > 0) {
        newState.divineMight = 30
      }
      newState.prominenceReady = 0
      newState.riotBladeReady = 0
      newState.royalAuthrityReady = 0
      newState.bladeOfValorReady = 0
      newState.bladeOfFaithReady = 0
      newState.bladeOfTruthReady = 0
      break
    }
    case 'Iron_Will': {
      newState.ironWill = true
      break
    }
    case 'Release_Iron_Will': {
      newState.ironWill = false
      break
    }
    case 'Circle_Of_Scorn': {
      newState.circleOfScornDuration = spell.dotDuration ?? 0
      newState.circleOfScornTIckTimer = spell.dotInterval ?? 0
      newState.circleOfScornDotPotency = spell.dotPotency ?? 0
      break
    }
  }
  return newState
}
function updateBuffs(state: PaladinState, deltaTime: number, action: Action) {
  if (state.atonementReady > 0) {
    state.atonementReady = Math.max(0, state.atonementReady - deltaTime)
  }

  if (state.supplicationReady > 0) {
    state.supplicationReady = Math.max(0, state.supplicationReady - deltaTime)
  }

  if (state.sepulchreReady > 0) {
    state.sepulchreReady = Math.max(0, state.sepulchreReady - deltaTime)
  }

  if (state.riotBladeReady > 0) {
    state.riotBladeReady = Math.max(0, state.riotBladeReady - deltaTime)
  }

  if (state.royalAuthrityReady > 0) {
    state.royalAuthrityReady = Math.max(0, state.royalAuthrityReady - deltaTime)
  }

  if (state.goringBladeReady > 0) {
    state.goringBladeReady = Math.max(0, state.goringBladeReady - deltaTime)
  }

  if (state.bladeOfFaithReady > 0) {
    state.bladeOfFaithReady = Math.max(0, state.bladeOfFaithReady - deltaTime)
  }

  if (state.bladeOfTruthReady > 0) {
    state.bladeOfTruthReady = Math.max(0, state.bladeOfTruthReady - deltaTime)
  }

  if (state.bladeOfHonorReady > 0) {
    state.bladeOfHonorReady = Math.max(0, state.bladeOfHonorReady - deltaTime)
  }

  if (state.bladeOfValorReady > 0) {
    state.bladeOfValorReady = Math.max(0, state.bladeOfValorReady - deltaTime)
  }

  if (state.fightOrFlight > 0) {
    state.fightOrFlight = Math.max(0, state.fightOrFlight - deltaTime)
  }
  const waitTime = action.recast - action.cast

  if (state.fightOrFlight < action.recast) {
    state.fightOrFlight = Math.max(0, state.fightOrFlight - waitTime)
  }
}
function updateDots(state: PaladinState, deltaTime: number): number {
  let potency = 0

  if (state.circleOfScornDuration <= 0) return 0

  state.circleOfScornTIckTimer -= deltaTime

  while (state.circleOfScornTIckTimer <= 0 && state.circleOfScornDuration > 0) {
    potency += state.circleOfScornDotPotency
    state.circleOfScornTIckTimer += 3
  }

  state.circleOfScornDuration -= deltaTime
  state.circleOfScornDuration = Math.max(0, state.circleOfScornDuration)
  console.log(potency)
  return potency
}
export function Pldsimulate(
  actions: Action[],
  isDuringDowntime: (time: number) => boolean
): SimulationResult<PaladinState> {
  let state = { ...initialState }

  let lastTime = 0
  let totalPotency = 0
  for (const action of actions) {
    const actionEnd = action.start + action.cast
    const deltaTime = actionEnd - lastTime

    totalPotency += updateDots(state, deltaTime)
    updateBuffs(state, deltaTime, action)

    state = applySpell(state, action)
    totalPotency += action.potency
    const autos = updateOath(state, deltaTime, lastTime, isDuringDowntime)
    totalPotency += autos * 70
    lastTime = actionEnd
  }
  return { state, totalPotency }
}
