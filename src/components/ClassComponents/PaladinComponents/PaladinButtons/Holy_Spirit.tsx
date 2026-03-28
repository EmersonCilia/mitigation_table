import holySpirit from '../../../../assets/paladin/Holy_Spirit.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HolySpirit = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function HolySpirit({
  addSpell,
  playerState,
  calculateGCD
}: HolySpirit) {
  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Holy_Spirit',
            icon: holySpirit,
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
        <img src={holySpirit} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
