import deploymentTactics from '../../../../assets/scholar/Deployment_Tactics.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type DeploymentTactics = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function DeploymentTactics({
  addSpell,
  rotationDuration,
  action
}: DeploymentTactics) {
  const cooldown = 90
  const lastDeploymentTactics = [...action]
    .reverse()
    .find((a) => a.name === 'Deployment_Tactics')

  const remainingCooldown = lastDeploymentTactics
    ? Math.max(0, cooldown - (rotationDuration - lastDeploymentTactics.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Deployment_Tactics',
            icon: deploymentTactics,
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
        <img src={deploymentTactics} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
