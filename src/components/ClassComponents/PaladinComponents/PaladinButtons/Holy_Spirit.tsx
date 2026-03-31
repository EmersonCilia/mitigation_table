import holySpirit from '../../../../assets/paladin/Holy_Spirit.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HolySpirit = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
}

export default function HolySpirit({ addSpell, playerState }: HolySpirit) {
  const potency =
    playerState.divineMight > 0 ? 500 : playerState.requiescat > 0 ? 700 : 400
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.divineMight > 0}
        onClick={() => {
          addSpell({
            name: 'Holy_Spirit',
            icon: holySpirit,
            cast:
              playerState.requiescat > 0 || playerState.divineMight > 0
                ? 0.64
                : 1.5,
            type: 'gcd',
            potency: playerState.fightOrFlight > 0 ? potency * 1.2 : potency,
            requiresTarget: true,
            recast: 2.5,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={holySpirit} width={40} />
        {playerState.divineMight > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
