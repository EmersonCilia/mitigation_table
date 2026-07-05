import protraction from '../../../../assets/scholar/Protraction.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Protraction = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Protraction({
  addSpell,
  rotationDuration,
  action
}: Protraction) {
  const cooldown = 60
  const lastProtraction = [...action]
    .reverse()
    .find((a) => a.name === 'Protraction')

  const remainingCooldown = lastProtraction
    ? Math.max(0, cooldown - (rotationDuration - lastProtraction.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Protraction',
            icon: protraction,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={protraction} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
