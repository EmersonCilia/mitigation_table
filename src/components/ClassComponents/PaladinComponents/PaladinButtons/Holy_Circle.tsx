import holyCircle from '../../../../assets/paladin/Holy_Circle.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HolyCircle = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function HolyCircle({
  addSpell,
  playerState,
  calculateGCD
}: HolyCircle) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'HolyCircle',
            icon: holyCircle,
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
        <img src={holyCircle} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
