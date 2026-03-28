import shirk from '../../../../assets/Shirk.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Shirk = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Shirk({ addSpell, rotationDuration, action }: Shirk) {
  const cooldown = 60
  const lastShirk = [...action].reverse().find((a) => a.name === 'Shirk')

  const remainingCooldown = lastShirk
    ? Math.max(0, cooldown - (rotationDuration - lastShirk.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Shirk',
            icon: shirk,
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
        <img src={shirk} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
