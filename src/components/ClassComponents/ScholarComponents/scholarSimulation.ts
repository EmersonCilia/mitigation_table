import { Action, ScholarState, SimulationResult } from '../../../Utils/types'

const initialState: ScholarState = {
  mana: 10000,
  recitation: 0,
  biolysisDuration: 0,
  biolysisDotPotency: 0,
  biolysisTIckTimer: 0,
  manaTickTimer: 3,
  seraphism: 0,
  swiftcast: 0,
  summonSeraphStack: 0,
  SummonSeraphDuration: 0,
  dissipation: 0,
  Aetherflow: 0,
  chainStatagem: 0,
  impactImminent: 0,
  lucidDream: 0
}

function applySpell(state: ScholarState, spell: Action): ScholarState {
  const newState = { ...state }
  switch (spell.name) {
    case 'Broil': {
      newState.mana -= 400
      if (newState.swiftcast > 0) {
        newState.swiftcast = 0
      }
      break
    }
    case 'Ruin_II': {
      newState.mana -= 400
      if (newState.swiftcast > 0) {
        newState.swiftcast = 0
      }
      break
    }
    case 'Succor': {
      newState.mana -= 900
      if (newState.swiftcast > 0) {
        newState.swiftcast = 0
      }
      break
    }
    case 'Adloquium': {
      newState.mana -= 900
      if (newState.swiftcast > 0) {
        newState.swiftcast = 0
      }
      break
    }
    case 'Biolysis': {
      newState.mana -= 400
      newState.biolysisDuration = spell.dotDuration ?? 0
      newState.biolysisTIckTimer = spell.dotInterval ?? 0
      newState.biolysisDotPotency = spell.dotPotency ?? 0
      break
    }
    case 'Summon_Seraph': {
      newState.summonSeraphStack = 2
      newState.SummonSeraphDuration = 22
      break
    }
    case 'Consolation': {
      newState.summonSeraphStack -= 1
      break
    }
    case 'Dissipation': {
      newState.dissipation = 30
      newState.seraphism = 0
      newState.Aetherflow = 3
      break
    }
    case 'Aetherflow': {
      newState.mana += 2000
      if (newState.mana > 10000) {
        newState.mana = 10000
      }
      newState.Aetherflow = 3
      break
    }
    case 'Energy_Drain': {
      newState.Aetherflow -= 1
      break
    }
    case 'Indomitability': {
      newState.Aetherflow -= 1
      break
    }
    case 'Sacred_Soil': {
      newState.Aetherflow -= 1
      break
    }
    case 'Excogitation': {
      newState.Aetherflow -= 1
      break
    }
    case 'Seraphism': {
      newState.seraphism = 20
      break
    }
    case 'Chain_Stratagem': {
      newState.chainStatagem = 20
      newState.impactImminent = 30
      break
    }
    case 'Baneful_Impaction': {
      newState.impactImminent = 0
      break
    }
    case 'Lucid_Dreaming': {
      newState.lucidDream = 21
      break
    }
    case 'Swiftcast': {
      newState.swiftcast = 10
      break
    }
  }
  return newState
}
function updateBuffs(state: ScholarState, deltaTime: number, action: Action) {
  if (state.SummonSeraphDuration > 0) {
    state.SummonSeraphDuration = Math.max(
      0,
      state.SummonSeraphDuration - deltaTime
    )
  }
  if (state.dissipation > 0) {
    state.dissipation = Math.max(0, state.dissipation - deltaTime)
  }
  if (state.seraphism > 0) {
    state.seraphism = Math.max(0, state.seraphism - deltaTime)
  }
  if (state.impactImminent > 0) {
    state.impactImminent = Math.max(0, state.impactImminent - deltaTime)
  }
  if (state.chainStatagem > 0) {
    state.chainStatagem = Math.max(0, state.chainStatagem - deltaTime)
  }
  if (state.lucidDream > 0) {
    state.lucidDream = Math.max(0, state.lucidDream - deltaTime)
  }
  if (state.swiftcast > 0) {
    state.lucidDream = Math.max(0, state.lucidDream - deltaTime)
  }

  const waitTime = action.recast - action.cast
}
function updateDots(state: ScholarState, deltaTime: number): number {
  let potency = 0

  if (state.biolysisDuration <= 0) return 0

  state.biolysisTIckTimer -= deltaTime

  while (state.biolysisTIckTimer <= 0 && state.biolysisDuration > 0) {
    potency += state.biolysisDotPotency
    state.biolysisTIckTimer += 3
  }

  state.biolysisDuration -= deltaTime
  state.biolysisDuration = Math.max(0, state.biolysisDuration)
  return potency
}
function updateMana(state: ScholarState, deltaTime: number) {
  state.manaTickTimer -= deltaTime

  while (state.manaTickTimer <= 0) {
    state.mana = Math.min(10000, state.mana + 200)
    if (state.lucidDream > 0) {
      state.mana = Math.min(10000, state.mana + 550)
    }
    state.manaTickTimer += 3
  }
}
export function Schsimulate(actions: Action[]): SimulationResult<ScholarState> {
  let state = { ...initialState }

  let lastTime = 0
  let totalPotency = 0
  for (const action of actions) {
    const actionEnd = action.start + action.cast
    const deltaTime = actionEnd - lastTime

    totalPotency += updateDots(state, deltaTime)
    updateBuffs(state, deltaTime, action)
    updateMana(state, deltaTime)

    state = applySpell(state, action)
    totalPotency += action.potency
    lastTime = actionEnd
  }
  return { state, totalPotency }
}
