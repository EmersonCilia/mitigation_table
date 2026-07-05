import emergencyTactics from '../../../../assets/scholar/Emergency_Tactics.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type EmergencyTactics = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function EmergencyTactics({
  addSpell,
  rotationDuration,
  action,
  playerState
}: EmergencyTactics) {
  const cooldown = playerState.seraphism > 0 ? 1 : 15
  const lastEmergencyTactics = [...action]
    .reverse()
    .find((a) => a.name === 'Emergency_Tactics')

  const remainingCooldown = lastEmergencyTactics
    ? Math.max(0, cooldown - (rotationDuration - lastEmergencyTactics.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Emergency_Tactics',
            icon: emergencyTactics,
            cast: 0.64,
            type: 'ogcd',
            potency: 100,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={emergencyTactics} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
