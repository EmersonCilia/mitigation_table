import manaward from '../../assets/BLM/Manaward.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type Manaward = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Manaward({
  addSpell,
  rotationDuration,
  action
}: Manaward) {
  const cooldown = 120
  const lastManaward = [...action].reverse().find((a) => a.name === 'Manaward')

  const remainingCooldown = lastManaward
    ? Math.max(0, cooldown - (rotationDuration - lastManaward.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Manaward',
            icon: manaward,
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
        <img src={manaward} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
