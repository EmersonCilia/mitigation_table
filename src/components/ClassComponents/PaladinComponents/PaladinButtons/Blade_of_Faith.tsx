import bladeOfFaith from '../../../../assets/paladin/Blade_of_Faith.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BladeOfFaith = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function BladeOfFaith({
  addSpell,
  playerState,
  calculateGCD
}: BladeOfFaith) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'BladeOfFaith',
            icon: bladeOfFaith,
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
        <img src={bladeOfFaith} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
