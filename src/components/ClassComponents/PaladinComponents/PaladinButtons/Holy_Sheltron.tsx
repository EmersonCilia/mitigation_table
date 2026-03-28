import holySheltron from '../../../../assets/paladin/Holy_Sheltron.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HolySheltron = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function HolySheltron({
  addSpell,
  rotationDuration,
  action
}: HolySheltron) {
  const cooldown = 5
  const lastHolySheltron = [...action]
    .reverse()
    .find((a) => a.name === 'Holy_Sheltron')

  const remainingCooldown = lastHolySheltron
    ? Math.max(0, cooldown - (rotationDuration - lastHolySheltron.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Holy_Sheltron',
            icon: holySheltron,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            oathcost: 50,
            job: 'PLD'
          })
        }}
      >
        <img src={holySheltron} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
