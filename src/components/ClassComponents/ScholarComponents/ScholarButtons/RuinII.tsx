import ruinII from '../../../../assets/scholar/Ruin_II.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Ruin_II = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: ScholarState
  calculateGCD: (baseGCD: number) => number
}

export default function Ruin_II({
  addSpell,
  playerState,
  calculateGCD
}: Ruin_II) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={playerState.mana < 400}
        onClick={() => {
          addSpell({
            name: 'Ruin_II',
            icon: ruinII,
            cast: 0.64,
            type: 'gcd',
            potency: 220,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 400,
            job: 'SCH'
          })
        }}
      >
        <img src={ruinII} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
