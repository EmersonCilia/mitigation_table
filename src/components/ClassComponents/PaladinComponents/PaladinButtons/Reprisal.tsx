import reprisal from '../../../../assets/Reprisal.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Reprisal = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Reprisal({
  addSpell,
  rotationDuration,
  action
}: Reprisal) {
  const cooldown = 60
  const lastReprisal = [...action].reverse().find((a) => a.name === 'Reprisal')

  const remainingCooldown = lastReprisal
    ? Math.max(0, cooldown - (rotationDuration - lastReprisal.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Reprisal',
            icon: reprisal,
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
        <img src={reprisal} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
