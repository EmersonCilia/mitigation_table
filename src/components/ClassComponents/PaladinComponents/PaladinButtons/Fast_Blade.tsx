import fastBlade from '../../../../assets/paladin/Fast_Blade.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type FastBlade = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function FastBlade({
  addSpell,
  playerState,
  calculateGCD
}: FastBlade) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Fast_Blade',
            icon: fastBlade,
            cast: 0.64,
            type: 'gcd',
            potency: 220,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={fastBlade} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
