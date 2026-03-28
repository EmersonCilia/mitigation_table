import guardian from '../../../../assets/paladin/Guardian_action.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Guardian = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Guardian({
  addSpell,
  rotationDuration,
  action
}: Guardian) {
  const cooldown = 120
  const lastGuardian = [...action].reverse().find((a) => a.name === 'Guardian')

  const remainingCooldown = lastGuardian
    ? Math.max(0, cooldown - (rotationDuration - lastGuardian.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Guardian',
            icon: guardian,
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
        <img src={guardian} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
