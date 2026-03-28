import circleOfScorn from '../../../../assets/paladin/Circle_of_Scorn.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type CircleOfScorn = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function CircleOfScorn({
  addSpell,
  rotationDuration,
  action
}: CircleOfScorn) {
  const cooldown = 30
  const lastCircleOfScorn = [...action]
    .reverse()
    .find((a) => a.name === 'CircleOfScorn')

  const remainingCooldown = lastCircleOfScorn
    ? Math.max(0, cooldown - (rotationDuration - lastCircleOfScorn.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'CircleOfScorn',
            icon: circleOfScorn,
            cast: 0.64,
            type: 'ogcd',
            potency: 140,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            dotDuration: 15,
            dotInterval: 3,
            dotPotency: 30,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={circleOfScorn} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
