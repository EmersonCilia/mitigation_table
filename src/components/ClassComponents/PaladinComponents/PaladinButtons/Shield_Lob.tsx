import shieldLob from '../../../../assets/paladin/Shield_Lob.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ShieldLob = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function ShieldLob({
  addSpell,
  playerState,
  calculateGCD
}: ShieldLob) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'ShieldLob',
            icon: shieldLob,
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
        <img src={shieldLob} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
