import xenoglossy from '../../../../assets/BLM/Xenoglossy.png'
import { Action, BlackMageState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Xenoglossy = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
}

export default function Xenoglossy({
  addSpell,
  playerState,
  calculateGCD
}: Xenoglossy) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 890

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        disabled={playerState.polyglot < 1}
        onClick={() =>
          addSpell({
            name: 'Xenoglossy',
            icon: xenoglossy,
            cast: 0.64,
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
        <img src={xenoglossy} width={40} />
      </S.SpellButton>
    </div>
  )
}
