import prominence from '../../../../assets/paladin/Prominence.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Prominence = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function Prominence({
  addSpell,
  playerState,
  calculateGCD
}: Prominence) {
  const recast = calculateGCD(2500)
  const potency = playerState.prominenceReady > 0 ? 220 : 100
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.prominenceReady > 0}
        onClick={() => {
          addSpell({
            name: 'Prominence',
            icon: prominence,
            cast: 0.64,
            type: 'gcd',
            potency: playerState.fightOrFlight > 0 ? potency * 1.2 : potency,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={prominence} width={40} />
        {playerState.prominenceReady > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
