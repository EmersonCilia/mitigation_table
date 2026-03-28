import royalAuthority from '../../../../assets/paladin/Royal_Authority.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type RoyalAuthority = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function RoyalAuthority({
  addSpell,
  playerState,
  calculateGCD
}: RoyalAuthority) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Royal_Authority',
            icon: royalAuthority,
            cast: 0.64,
            type: 'gcd',
            potency: 0,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={royalAuthority} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
