import expedient from '../../../../assets/scholar/Expedient.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Expedient = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Expedient({
  addSpell,
  rotationDuration,
  action
}: Expedient) {
  const cooldown = 120
  const lastExpedient = [...action]
    .reverse()
    .find((a) => a.name === 'Expedient')

  const remainingCooldown = lastExpedient
    ? Math.max(0, cooldown - (rotationDuration - lastExpedient.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Expedient',
            icon: expedient,
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
        <img src={expedient} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
