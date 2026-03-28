import bladeOfTruth from '../../../../assets/paladin/Blade_of_Truth.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BladeOfTruth = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function BladeOfTruth({
  addSpell,
  playerState,
  calculateGCD
}: BladeOfTruth) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'BladeOfTruth',
            icon: bladeOfTruth,
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
        <img src={bladeOfTruth} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
