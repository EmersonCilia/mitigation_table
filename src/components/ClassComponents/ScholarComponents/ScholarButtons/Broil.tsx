import broil from '../../../../assets/scholar/Broil_IV.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Broil = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: ScholarState
  calculateGCD: (baseGCD: number) => number
}

export default function Broil({ addSpell, playerState, calculateGCD }: Broil) {
  const recast = calculateGCD(2500)
  const cast = calculateGCD(1500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={playerState.mana < 400}
        onClick={() => {
          addSpell({
            name: 'Broil',
            icon: broil,
            cast: playerState.swiftcast > 0 ? 0.64 : cast,
            type: 'gcd',
            potency: 320,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 400,
            job: 'SCH'
          })
        }}
      >
        <img src={broil} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
