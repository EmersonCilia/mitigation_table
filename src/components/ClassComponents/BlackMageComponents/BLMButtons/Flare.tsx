import flare from '../../../../assets/BLM/Flare.png'
import { Action, BlackMageState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Flare = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
}

export default function Flare({ addSpell, playerState, calculateGCD }: Flare) {
  const recast = calculateGCD(2500)
  const cast = calculateGCD(2000)

  let finalCast = cast
  if (playerState.swiftcast || playerState.triplecast > 0) {
    finalCast = 0.64
  }
  let potency = 240

  if (playerState.astralFire === 1) {
    potency *= 1.4
  } else if (playerState.astralFire === 2) {
    potency *= 1.6
  } else if (playerState.astralFire === 3) {
    potency *= 1.8
  } else if (playerState.umbralIce === 1) {
    potency *= 0.9
  } else if (playerState.umbralIce === 2) {
    potency *= 0.8
  } else if (playerState.umbralIce === 3) {
    potency *= 0.7
  }

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  return (
    <div>
      <S.SpellButton
        disabled={playerState.astralFire === 0 || playerState.mana < 800}
        onClick={() =>
          addSpell({
            name: 'Flare',
            icon: flare,
            cast: finalCast * leylinesModifier,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: playerState.mana,
            job: 'BLM'
          })
        }
      >
        <img src={flare} width={40} />
      </S.SpellButton>
    </div>
  )
}
