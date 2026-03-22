import freeze from '../../assets/BLM/Freeze.png'
import { Action, PlayerState } from '../../Utils/types'
import * as S from './styles'

type Freeze = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function Freeze({
  addSpell,
  playerState,
  calculateGCD
}: Freeze) {
  const cast = calculateGCD(2000)
  const recast = calculateGCD(2500)

  let finalCast = cast
  if (playerState.swiftcast || playerState.triplecast > 0) {
    finalCast = 0.64
  }
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 120
  if (playerState.astralFire === 1) {
    potency *= 0.9
  } else if (playerState.astralFire === 2) {
    potency *= 0.8
  } else if (playerState.astralFire === 3) {
    potency *= 0.7
  }

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        disabled={playerState.umbralIce === 0}
        onClick={() =>
          addSpell({
            name: 'Freeze',
            icon: freeze,
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
        <img src={freeze} width={40} />
      </S.SpellButton>
    </div>
  )
}
