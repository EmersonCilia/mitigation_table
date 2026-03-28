import bladeOfHonor from '../../../../assets/paladin/Blade_of_Honor.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BladeOfHonor = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function BladeOfHonor({
  addSpell,
  playerState,
  calculateGCD
}: BladeOfHonor) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'BladeOfHonor',
            icon: bladeOfHonor,
            cast: 0.64,
            type: 'ogcd',
            potency: 1000,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={bladeOfHonor} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
