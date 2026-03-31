import shieldBash from '../../../../assets/paladin/Shield_Bash.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ShieldBash = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function ShieldBash({
  addSpell,
  playerState,
  calculateGCD
}: ShieldBash) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'ShieldBash',
            icon: shieldBash,
            cast: 0.64,
            type: 'gcd',
            potency: playerState.fightOrFlight > 0 ? 100 * 1.2 : 100,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={shieldBash} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
