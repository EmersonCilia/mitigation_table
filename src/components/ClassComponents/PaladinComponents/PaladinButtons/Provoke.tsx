import provoke from '../../../../assets/Provoke.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Provoke = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Provoke({
  addSpell,
  rotationDuration,
  action
}: Provoke) {
  const cooldown = 90
  const lastProvoke = [...action].reverse().find((a) => a.name === 'Provoke')

  const remainingCooldown = lastProvoke
    ? Math.max(0, cooldown - (rotationDuration - lastProvoke.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Provoke',
            icon: provoke,
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
        <img src={provoke} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
