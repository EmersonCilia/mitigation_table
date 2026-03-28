import confliteor from '../../../../assets/paladin/Confiteor.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Confliteor = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function Confliteor({
  addSpell,
  playerState,
  calculateGCD
}: Confliteor) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Confliteor',
            icon: confliteor,
            cast: 0.64,
            type: 'gcd',
            potency: 500,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 1000,
            job: 'PLD'
          })
        }}
      >
        <img src={confliteor} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
