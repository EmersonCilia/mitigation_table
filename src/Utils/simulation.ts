import { Action, PlayerState } from '../Utils/types'

const initialState: PlayerState = {
  astralFire: 0,
  umbralIce: 0,
  umbralHearts: 0,
  paradox: false,
  thunderhead: false,
  polyglot: 0,
  polyglotTimer: 0,
  astralGauge: 0,
  fireStarter: false,
  mana: 10000,
  highThunderDuration: 0,
  highThunderTickTimer: 0,
  highThunderDotPotency: 0,
  swiftcast: 0,
  triplecast: 0,
  triplecastDuration: 0,
  leylines: 0
}
function applySpell(state: PlayerState, spell: Action): PlayerState {
  const newState = { ...state }
  if (spell.name === 'Fire III') {
    if (state.astralFire === 0) {
      newState.thunderhead = true
    }
    if (state.umbralIce === 3 && state.umbralHearts === 3) {
      newState.paradox = true
    }
    if (newState.umbralIce === 0 && !newState.fireStarter) {
      const baseCost = state.astralFire === 0 ? 2000 : 4000

      if (newState.umbralHearts > 0) {
        newState.umbralHearts--
        newState.mana -= baseCost / 2
      } else {
        newState.mana -= baseCost
      }
    }
    if (state.fireStarter) {
      newState.fireStarter = false
    } else if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }
    newState.astralFire = 3
    newState.umbralIce = 0
    newState.fireStarter = false
  }
  if (spell.name === 'Blizzard III' || spell.name === 'High Blizzard II') {
    if (state.astralFire === 0 && state.umbralIce === 0) {
      newState.mana -= 800
    }
    if (state.umbralIce === 0) {
      newState.thunderhead = true
    }
    if (state.astralFire === 3) {
      newState.paradox = true
    }
    if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }
    if (state.umbralIce === 1) {
      newState.mana = 2500
    } else if (state.umbralIce === 2) {
      newState.mana = 5000
    } else if (state.umbralIce === 3) {
      newState.mana = 10000
    }
    newState.umbralIce = 3
    newState.astralFire = 0
    newState.astralGauge = 0
  }
  if (spell.name === 'Fire IV') {
    if (newState.astralGauge < 6) {
      newState.astralGauge++
    }
    if (newState.umbralHearts === 0) {
      newState.mana -= 1600
    }
    if (newState.umbralHearts > 0) {
      newState.mana -= 800
      newState.umbralHearts--
    }
    if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }
  }
  if (spell.name === 'High Fire II') {
    if (
      (newState.umbralHearts > 0 && newState.astralFire > 0) ||
      (newState.astralFire === 0 && newState.umbralIce === 0)
    ) {
      newState.mana -= 1500
    }
    if (newState.umbralHearts === 0 && newState.astralFire > 0) {
      newState.mana -= 3000
    }
    if (newState.umbralHearts > 0) {
      newState.umbralHearts--
    }
    if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }
    newState.astralFire = 3
    newState.umbralIce = 0
  }
  if (spell.name === 'Paradox') {
    newState.fireStarter = true
    newState.paradox = false
    if (newState.umbralIce === 0) {
      newState.mana -= 1600
    }
  }
  if (spell.name === 'Flare Star') {
    newState.astralGauge = 0
    if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }
  }
  if (spell.name === 'Blizzard IV' || spell.name === 'Freeze') {
    if (state.umbralIce === 1) {
      newState.mana = 2500
    } else if (state.umbralIce === 2) {
      newState.mana = 5000
    } else if (state.umbralIce === 3) {
      newState.mana = 10000
    }
    if (state.swiftcast) {
      newState.swiftcast = 0
    } else if (state.triplecast > 0) {
      newState.triplecast -= 1
    }

    newState.umbralHearts = 3
  }
  if (spell.name === 'Xenoglossy' || spell.name === 'Foul') {
    newState.polyglot--
  }
  if (spell.name === 'High Thunder' || spell.name === 'High Thunder II') {
    newState.thunderhead = false
    newState.highThunderDuration = spell.dotDuration ?? 0
    newState.highThunderTickTimer = spell.dotInterval ?? 0
    newState.highThunderDotPotency = spell.dotPotency ?? 0
  }
  if (spell.name === 'Despair' || spell.name === 'Flare') {
    if (spell.name === 'Flare') {
      if (state.swiftcast) {
        newState.swiftcast = 0
      } else if (state.triplecast > 0) {
        newState.triplecast -= 1
      }
      if (state.umbralHearts > 0) {
        newState.mana -= newState.mana * 0.34
      }
      newState.astralGauge = Math.min(newState.astralGauge + 3, 6)
      newState.umbralHearts = 0
    }
    if (spell.name === 'Despair' || state.umbralHearts === 0)
      newState.mana -= newState.mana
  }
  if (spell.name === 'Transpose') {
    if (newState.astralFire > 0) {
      newState.astralFire = 0
      newState.umbralIce = 1
    } else if (newState.umbralIce > 0) {
      newState.umbralIce = 0
      newState.astralFire = 1
    }
    if (
      state.astralFire === 3 ||
      (state.umbralIce === 3 && state.umbralHearts === 3)
    ) {
      newState.paradox = true
    }
  }
  if (spell.name === 'Umbral Soul') {
    if (state.umbralIce === 1) {
      newState.mana = 2500
    } else if (state.umbralIce === 2) {
      newState.mana = 5000
    } else if (state.umbralIce === 3) {
      newState.mana = 10000
    }
    newState.umbralIce = Math.min(newState.umbralIce + 1, 3)
    newState.umbralHearts = Math.min(newState.umbralHearts + 1, 3)
  }
  if (spell.name === 'Amplifier') {
    if (state.polyglot < 3) {
      newState.polyglot++
    }
  }
  if (spell.name === 'Manafont') {
    newState.astralFire = 3
    newState.thunderhead = true
    newState.umbralHearts = 3
    newState.paradox = true
    newState.mana = 10000
  }
  if (spell.name === 'Swiftcast') {
    newState.swiftcast = 10
  }
  if (spell.name === 'Triplecast') {
    newState.triplecast = 3
    newState.triplecastDuration = 15
  }
  if (spell.name === 'Ley Lines') {
    newState.leylines = 20
  }
  return newState
}

function updatePolyglot(state: PlayerState, deltaTime: number) {
  if (state.astralFire === 0 && state.umbralIce === 0) return

  if (deltaTime > 0) {
    state.polyglotTimer += deltaTime
  }

  if (state.polyglotTimer >= 30) {
    state.polyglotTimer -= 30
    if (state.polyglot <= 3) {
      state.polyglot++
    }
  }
}
function updateDots(state: PlayerState, deltaTime: number): number {
  let potency = 0

  if (state.highThunderDuration <= 0) return 0

  state.highThunderTickTimer -= deltaTime

  while (state.highThunderTickTimer <= 0 && state.highThunderDuration > 0) {
    potency += state.highThunderDotPotency
    state.highThunderTickTimer += 3
  }

  state.highThunderDuration -= deltaTime
  state.highThunderDuration = Math.max(0, state.highThunderDuration)

  return potency
}
function updateBuffs(state: PlayerState, deltaTime: number, action: Action) {
  if (state.swiftcast > 0) {
    state.swiftcast = Math.max(0, state.swiftcast - deltaTime)
  }
  if (state.leylines > 0) {
    state.leylines = Math.max(0, state.leylines - deltaTime)
  }
  if (state.triplecastDuration > 0) {
    state.triplecastDuration = Math.max(0, state.triplecastDuration - deltaTime)
  }
  const waitTime = action.recast - action.cast

  if (state.swiftcast < action.recast) {
    state.swiftcast = Math.max(0, state.swiftcast - waitTime)
  }
  if (state.leylines > 0 && state.leylines < action.recast) {
    state.leylines = Math.max(0, state.leylines - waitTime)
  }
  if (
    state.triplecastDuration > 0 &&
    state.triplecastDuration < action.recast
  ) {
    state.triplecastDuration = Math.max(0, state.triplecastDuration - waitTime)

    if (state.triplecastDuration === 0) {
      state.triplecast = 0
    }
  }
}
export function simulate(actions: Action[]) {
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

    updatePolyglot(state, deltaTime)
    lastTime = actionEnd
  }
  return { state, totalPotency }
}
