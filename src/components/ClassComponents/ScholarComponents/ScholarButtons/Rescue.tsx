import rescue from '../../../../assets/Rescue.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Rescue = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Rescue({ addSpell, rotationDuration, action }: Rescue) {
  const cooldown = 120
  const lastRescue = [...action].reverse().find((a) => a.name === 'Rescue')

  const remainingCooldown = lastRescue
    ? Math.max(0, cooldown - (rotationDuration - lastRescue.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Rescue',
            icon: rescue,
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
        <img src={rescue} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
