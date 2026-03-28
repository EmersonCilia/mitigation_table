import totalEclipse from '../../../../assets/paladin/Total_Eclipse.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type TotalEclipse = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function TotalEclipse({
  addSpell,
  playerState,
  calculateGCD
}: TotalEclipse) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'TotalEclipse',
            icon: totalEclipse,
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
        <img src={totalEclipse} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
