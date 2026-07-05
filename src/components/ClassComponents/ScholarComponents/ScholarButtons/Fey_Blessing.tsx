import feyBlessing from '../../../../assets/scholar/Fey_Blessing.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type FeyBlessing = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function FeyBlessing({
  addSpell,
  rotationDuration,
  action,
  playerState
}: FeyBlessing) {
  const cooldown = 60
  const lastFeyBlessing = [...action]
    .reverse()
    .find((a) => a.name === 'Fey_Blessing')

  const remainingCooldown = lastFeyBlessing
    ? Math.max(0, cooldown - (rotationDuration - lastFeyBlessing.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={
          remainingCooldown > 0 ||
          playerState.SummonSeraphDuration > 0 ||
          playerState.dissipation > 0
        }
        onClick={() => {
          if (
            remainingCooldown > 0 ||
            playerState.SummonSeraphDuration > 0 ||
            playerState.dissipation > 0
          )
            return

          addSpell({
            name: 'Fey_Blessing',
            icon: feyBlessing,
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
        <img src={feyBlessing} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
