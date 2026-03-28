import intervention from '../../../../assets/paladin/Intervention.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Intervention = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Intervention({
  addSpell,
  rotationDuration,
  action
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
        disabled={remainingCooldown > 0}
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
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
