import goringBlade from '../../../../assets/paladin/Goring_Blade.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type GoringBlade = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function GoringBlade({
  addSpell,
  playerState,
  calculateGCD
}: GoringBlade) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'GoringBlade',
            icon: goringBlade,
            cast: 0.64,
            type: 'gcd',
            potency: 500,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={goringBlade} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
