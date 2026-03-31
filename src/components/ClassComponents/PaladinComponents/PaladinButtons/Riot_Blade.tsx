import riotBlade from '../../../../assets/paladin/Riot_Blade.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type RiotBlade = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function RiotBlade({
  addSpell,
  playerState,
  calculateGCD
}: RiotBlade) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.riotBladeReady > 0}
        onClick={() => {
          addSpell({
            name: 'Riot_Blade',
            icon: riotBlade,
            cast: 0.64,
            type: 'gcd',
            potency: playerState.riotBladeReady > 0 ? 330 : 170,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={riotBlade} width={40} />
        {playerState.riotBladeReady > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
