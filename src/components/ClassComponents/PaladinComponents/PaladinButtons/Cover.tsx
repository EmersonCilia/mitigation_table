import cover from '../../../../assets/paladin/Cover.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Cover = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function Cover({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Cover) {
  const cooldown = 120
  const lastCover = [...action].reverse().find((a) => a.name === 'Cover')

  const remainingCooldown = lastCover
    ? Math.max(0, cooldown - (rotationDuration - lastCover.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.oath >= 50}
        disabled={remainingCooldown > 0 || playerState.oath < 50}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Cover',
            icon: cover,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            oathcost: 50,
            job: 'PLD'
          })
        }}
      >
        <img src={cover} width={40} />
        {playerState.oath >= 50 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
