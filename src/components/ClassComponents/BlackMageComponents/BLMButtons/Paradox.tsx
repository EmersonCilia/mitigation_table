import paradox from '../../../../assets/BLM/Paradox.png'
import { Action, BlackMageState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Paradox = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
}

export default function Paradox({
  addSpell,
  playerState,
  calculateGCD
}: Paradox) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 540

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        disabled={
          !playerState.paradox ||
          (playerState.mana < 1600 && playerState.umbralIce === 0)
        }
        onClick={() =>
          addSpell({
            name: 'Paradox',
            icon: paradox,
            cast: 0.64,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: 1600,
            job: 'BLM'
          })
        }
      >
        <img src={paradox} width={40} />
      </S.SpellButton>
    </div>
  )
}
