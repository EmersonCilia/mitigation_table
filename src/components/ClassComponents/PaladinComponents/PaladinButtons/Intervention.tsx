import intervention from '../../../../assets/paladin/Intervention.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Intervention = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function Intervention({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Intervention) {
  const cooldown = 10
  const lastIntervention = [...action]
    .reverse()
    .find((a) => a.name === 'Intervention')

  const remainingCooldown = lastIntervention
    ? Math.max(0, cooldown - (rotationDuration - lastIntervention.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.oath >= 50}
        disabled={remainingCooldown > 0 || playerState.oath < 50}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Intervention',
            icon: intervention,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={intervention} width={40} />
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
