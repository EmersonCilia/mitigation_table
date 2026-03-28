import divineVeil from '../../../../assets/paladin/Divine_Veil.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type DivineVeil = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function DivineVeil({
  addSpell,
  rotationDuration,
  action
}: DivineVeil) {
  const cooldown = 90
  const lastDivineVeil = [...action]
    .reverse()
    .find((a) => a.name === 'Divine_Veil')

  const remainingCooldown = lastDivineVeil
    ? Math.max(0, cooldown - (rotationDuration - lastDivineVeil.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Divine_Veil',
            icon: divineVeil,
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
        <img src={divineVeil} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
