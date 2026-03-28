import imperator from '../../../../assets/paladin/Imperator.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Imperator = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Imperator({
  addSpell,
  rotationDuration,
  action
}: Imperator) {
  const cooldown = 60
  const lastImperator = [...action]
    .reverse()
    .find((a) => a.name === 'Imperator')

  const remainingCooldown = lastImperator
    ? Math.max(0, cooldown - (rotationDuration - lastImperator.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Imperator',
            icon: imperator,
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
        <img src={imperator} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
