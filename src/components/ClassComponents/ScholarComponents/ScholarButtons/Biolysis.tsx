import biolysis from '../../../../assets/scholar/Biolysis.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Biolysis = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  calculateGCD: (baseGCD: number) => number
}

export default function Biolysis({ addSpell, calculateGCD }: Biolysis) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() =>
          addSpell({
            name: 'Biolysis',
            icon: biolysis,
            cast: 0.64,
            type: 'gcd',
            potency: 0,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            dotDuration: 30,
            dotInterval: 3,
            dotPotency: 85,
            manacost: 40,
            job: 'PLD'
          })
        }
      >
        <img src={biolysis} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
