import fireIV from '../../../assets/BLM/Fire_IV.png'
import { Action, PlayerState } from '../../../Utils/types'
import * as S from '../styles'

type FireIV = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function FireIV({
  addSpell,
  playerState,
  calculateGCD
}: FireIV) {
  const cast = calculateGCD(2000)
  const recast = calculateGCD(2500)
  let finalCast = cast
  if (playerState.swiftcast || playerState.triplecast > 0) {
    finalCast = 0.64
  }
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 300

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
  return (
    <div>
      <S.SpellButton
        disabled={playerState.astralFire === 0 || playerState.mana < 1600}
        onClick={() =>
          addSpell({
            name: 'Fire IV',
            icon: fireIV,
            cast: finalCast * leylinesModifier,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: 0,
            job: 'BLM'
          })
        }
      >
        <img src={fireIV} width={40} />
      </S.SpellButton>
    </div>
  )
}
