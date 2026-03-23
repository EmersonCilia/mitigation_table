import highThunder from '../../../assets/BLM/High_Thunder.png'
import { Action, PlayerState } from '../../../Utils/types'
import * as S from '../styles'

type HighThunder = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function HighThunder({
  addSpell,
  playerState,
  calculateGCD
}: HighThunder) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 150
  let dotPotency = 60

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
            name: 'High Thunder',
            icon: highThunder,
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
        <img src={highThunder} width={40} />
      </S.SpellButton>
    </div>
  )
}
