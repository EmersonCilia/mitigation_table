import bulwark from '../../../../assets/paladin/Bulwark.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Bulwark = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Bulwark({
  addSpell,
  rotationDuration,
  action
}: Bulwark) {
  const cooldown = 90
  const lastBulwark = [...action].reverse().find((a) => a.name === 'Bulwark')

  const remainingCooldown = lastBulwark
    ? Math.max(0, cooldown - (rotationDuration - lastBulwark.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Bulwark',
            icon: bulwark,
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
        <img src={bulwark} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
