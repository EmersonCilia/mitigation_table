import holyCircle from '../../../../assets/paladin/Holy_Circle.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HolyCircle = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
}

export default function HolyCircle({ addSpell, playerState }: HolyCircle) {
  const potency =
    playerState.requiescat > 0 || playerState.divineMight > 0 ? 250 : 350

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={playerState.mana < 1000}
        $glow={playerState.divineMight > 0}
        onClick={() => {
          addSpell({
            name: 'Holy_Circle',
            icon: holyCircle,
            cast:
              playerState.requiescat > 0 || playerState.divineMight > 0
                ? 0.64
                : 1.5,
            type: 'gcd',
            potency: playerState.fightOrFlight > 0 ? potency * 1.2 : potency,
            requiresTarget: false,
            recast: 2.5,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={holyCircle} width={40} />
        {playerState.divineMight > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
