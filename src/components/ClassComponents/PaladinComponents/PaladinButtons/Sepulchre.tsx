import sepulchre from '../../../../assets/paladin/Sepulchre.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Sepulchre = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function Sepulchre({
  addSpell,
  playerState,
  calculateGCD
}: Sepulchre) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Sepulchre',
            icon: sepulchre,
            cast: 0.64,
            type: 'gcd',
            potency: 540,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={sepulchre} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
