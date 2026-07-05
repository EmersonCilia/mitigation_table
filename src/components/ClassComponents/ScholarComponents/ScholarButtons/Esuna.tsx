import esuna from '../../../../assets/Esuna.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Esuna = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  calculateGCD: (baseGCD: number) => number
}

export default function Esuna({ addSpell, calculateGCD }: Esuna) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Esuna',
            icon: esuna,
            cast: 0.64,
            type: 'gcd',
            potency: 0,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={esuna} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
