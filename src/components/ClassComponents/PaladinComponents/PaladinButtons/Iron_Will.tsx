import ironWill from '../../../../assets/Iron_Will.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type IronWill = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function IronWill({
  addSpell,
  rotationDuration,
  action
}: IronWill) {
  const cooldown = 2
  const lastIronWill = [...action].reverse().find((a) => a.name === 'Iron_Will')

  const remainingCooldown = lastIronWill
    ? Math.max(0, cooldown - (rotationDuration - lastIronWill.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Iron_Will',
            icon: ironWill,
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
        <img src={ironWill} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
