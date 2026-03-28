import atonement from '../../../../assets/paladin/Atonement.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Atonement = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function Atonement({
  addSpell,
  playerState,
  calculateGCD
}: Atonement) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Atonement',
            icon: atonement,
            cast: 0.64,
            type: 'gcd',
            potency: 460,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={atonement} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
