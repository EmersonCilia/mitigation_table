import goringBlade from '../../../../assets/paladin/Goring_Blade.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type GoringBlade = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function GoringBlade({
  addSpell,
  playerState,
  calculateGCD
}: GoringBlade) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.goringBladeReady > 0}
        disabled={playerState.goringBladeReady <= 0}
        onClick={() => {
          addSpell({
            name: 'Goring_Blade',
            icon: goringBlade,
            cast: 0.64,
            type: 'gcd',
            potency: playerState.fightOrFlight > 0 ? 700 * 1.2 : 700,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={goringBlade} width={40} />
        {playerState.goringBladeReady > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
