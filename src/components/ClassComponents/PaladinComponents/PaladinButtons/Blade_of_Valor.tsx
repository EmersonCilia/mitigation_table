import bladeOfValor from '../../../../assets/paladin/Blade_of_Valor.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BladeOfValor = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function BladeOfValor({
  addSpell,
  playerState,
  calculateGCD
}: BladeOfValor) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'BladeOfValor',
            icon: bladeOfValor,
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
        <img src={bladeOfValor} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
