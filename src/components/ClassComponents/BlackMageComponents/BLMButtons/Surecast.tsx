import surecast from '../../../../assets/Surecast.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Surecast = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Surecast({
  addSpell,
  rotationDuration,
  action
}: Surecast) {
  const cooldown = 120
  const lastSurecast = [...action].reverse().find((a) => a.name === 'Surecast')

  const remainingCooldown = lastSurecast
    ? Math.max(0, cooldown - (rotationDuration - lastSurecast.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Surecast',
            icon: surecast,
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
        <img src={surecast} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
