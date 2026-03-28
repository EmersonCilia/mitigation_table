import sprint from '../../../../assets/Sprint.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Sprint = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Sprint({ addSpell, rotationDuration, action }: Sprint) {
  const cooldown = 60
  const lastSprint = [...action].reverse().find((a) => a.name === 'Sprint')

  const remainingCooldown = lastSprint
    ? Math.max(0, cooldown - (rotationDuration - lastSprint.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Sprint',
            icon: sprint,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 2.5,
            cooldown: cooldown,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={sprint} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
