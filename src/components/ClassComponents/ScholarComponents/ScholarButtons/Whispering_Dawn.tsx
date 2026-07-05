import whisperingDawn from '../../../../assets/scholar/Whispering_Dawn-sch.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type WhisperingDawn = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function WhisperingDawn({
  addSpell,
  rotationDuration,
  action,
  playerState
}: WhisperingDawn) {
  const cooldown = 60
  const lastWhisperingDawn = [...action]
    .reverse()
    .find((a) => a.name === 'Whispering_Dawn')

  const remainingCooldown = lastWhisperingDawn
    ? Math.max(0, cooldown - (rotationDuration - lastWhisperingDawn.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.dissipation > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Whispering_Dawn',
            icon: whisperingDawn,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={whisperingDawn} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
