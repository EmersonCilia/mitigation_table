import despair from '../../../assets/BLM/Despair.png'
import { Action, PlayerState } from '../../../Utils/types'
import * as S from '../styles'

type Despair = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function Despair({
  addSpell,
  playerState,
  calculateGCD
}: Despair) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 350

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
        disabled={playerState.astralFire === 0 || playerState.mana < 800}
        onClick={() =>
          addSpell({
            name: 'Despair',
            icon: despair,
            cast: 0.64,
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
        <img src={despair} width={40} />
      </S.SpellButton>
    </div>
  )
}
