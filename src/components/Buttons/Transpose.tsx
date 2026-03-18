import transpose from '../../assets/BLM/Transpose.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type Transpose = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Transpose({
  addSpell,
  rotationDuration,
  action
}: Transpose) {
  const cooldown = 6
  const lastTranspose = [...action]
    .reverse()
    .find((a) => a.name === 'Transpose')

  const remainingCooldown = lastTranspose
    ? Math.max(0, cooldown - (rotationDuration - lastTranspose.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Transpose',
            icon: transpose,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0
          })
        }}
      >
        <img src={transpose} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
