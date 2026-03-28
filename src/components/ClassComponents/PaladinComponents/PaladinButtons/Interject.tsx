import interject from '../../../../assets/Interject.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Interject = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Interject({
  addSpell,
  rotationDuration,
  action
}: Interject) {
  const cooldown = 60
  const lastInterject = [...action]
    .reverse()
    .find((a) => a.name === 'Interject')

  const remainingCooldown = lastInterject
    ? Math.max(0, cooldown - (rotationDuration - lastInterject.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Interject',
            icon: interject,
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
        <img src={interject} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
