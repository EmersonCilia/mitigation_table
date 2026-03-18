import foul from '../../assets/BLM/Foul.png'
import { Action, PlayerState } from '../../Utils/types'
import * as S from './styles'

type Foul = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function Foul({ addSpell, playerState, calculateGCD }: Foul) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 600

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        disabled={playerState.polyglot < 1}
        onClick={() =>
          addSpell({
            name: 'Foul',
            icon: foul,
            cast: 0.64,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: 0
          })
        }
      >
        <img src={foul} width={40} />
      </S.SpellButton>
    </div>
  )
}
