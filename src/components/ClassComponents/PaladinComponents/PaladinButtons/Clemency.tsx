import clemency from '../../../../assets/paladin/Clemency.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Clemency = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
}

export default function Clemency({ addSpell, playerState }: Clemency) {
  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Clemency',
            icon: clemency,
            cast: playerState.requiescat > 0 ? 0.64 : 1.5,
            type: 'gcd',
            potency: 0,
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
