import addle from '../../assets/BLM/Addle.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type Addle = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Addle({ addSpell, rotationDuration, action }: Addle) {
  const cooldown = 90
  const lastAddle = [...action].reverse().find((a) => a.name === 'Addle')

  const remainingCooldown = lastAddle
    ? Math.max(0, cooldown - (rotationDuration - lastAddle.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Addle',
            icon: addle,
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
        <img src={addle} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
