import clemency from '../../../../assets/paladin/Clemency.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Clemency = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function Clemency({
  addSpell,
  playerState,
  calculateGCD
}: Clemency) {
  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Clemency',
            icon: clemency,
            cast: 1.5,
            type: 'gcd',
            potency: 500,
            requiresTarget: false,
            recast: 2.5,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={clemency} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
