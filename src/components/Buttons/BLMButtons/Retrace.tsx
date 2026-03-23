import retrace from '../../../assets/BLM/Retrace.png'
import { Action } from '../../../Utils/types'
import * as S from '../styles'

type Retrace = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Retrace({
  addSpell,
  rotationDuration,
  action
}: Retrace) {
  const cooldown = 40
  const lastRetrace = [...action].reverse().find((a) => a.name === 'Retrace')

  const remainingCooldown = lastRetrace
    ? Math.max(0, cooldown - (rotationDuration - lastRetrace.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Retrace',
            icon: retrace,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'BLM'
          })
        }}
      >
        <img src={retrace} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
