import highThunderII from '../../assets/BLM/High_Thunder_II.png'
import { Action, PlayerState } from '../../Utils/types'
import * as S from './styles'

type HighThunderII = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function HighThunderII({
  addSpell,
  playerState,
  calculateGCD
}: HighThunderII) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 100
  let dotPotency = 40
  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
    dotPotency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        disabled={playerState.thunderhead === false}
        onClick={() =>
          addSpell({
            name: 'High Thunder II',
            icon: highThunderII,
            cast: 0.64,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: 0,
            dotPotency: dotPotency,
            dotDuration: 30,
            dotInterval: 3,
            job: 'BLM'
          })
        }
      >
        <img src={highThunderII} width={40} />
      </S.SpellButton>
    </div>
  )
}
