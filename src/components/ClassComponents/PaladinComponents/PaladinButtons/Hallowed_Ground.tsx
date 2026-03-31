import hallowedGround from '../../../../assets/paladin/Hallowed_Ground.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HallowedGround = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function HallowedGround({
  addSpell,
  rotationDuration,
  action
}: HallowedGround) {
  const cooldown = 420
  const lastHallowedGround = [...action]
    .reverse()
    .find((a) => a.name === 'Hallowed_Ground')

  const remainingCooldown = lastHallowedGround
    ? Math.max(0, cooldown - (rotationDuration - lastHallowedGround.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Hallowed_Ground',
            icon: hallowedGround,
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
        <img src={hallowedGround} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
