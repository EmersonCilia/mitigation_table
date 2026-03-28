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
  fightOrFlight: 0
}
function applySpell(state: PaladinState, spell: Action): PaladinState {
  const newState = { ...state }
  switch (spell.name) {
    case 'Clemency': {
      newState.mana -= 2000
      newState.requiescat -= 1
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
    case 'Riot_Blade': {
      newState.divineMight = 30
      newState.atonementReady = 30
      newState.supplicationReady = 0
      newState.sepulchreReady = 0
      break
    }
    case 'atonement': {
      newState.supplicationReady = 30
      break
    }
    case 'Supplication': {
      newState.sepulchreReady = 30
      break
    }
    case 'Sepulchre': {
      newState.sepulchreReady = 0
      break
    }
    case 'Holy_Spirit': {
      newState.divineMight = 0
      if (newState.requiescat > 0) {
        newState.requiescat--
      }
      break
    }
  }
  return newState
}

export function Pldsimulate(actions: Action[]): SimulationResult<PaladinState> {
  let state = { ...initialState }

  let lastTime = 0
  let totalPotency = 0

  for (const action of actions) {
    const actionEnd = action.start + action.cast
    const deltaTime = actionEnd - lastTime

    state = applySpell(state, action)

    totalPotency += action.potency
    lastTime = actionEnd
  }
  return { state, totalPotency }
}
