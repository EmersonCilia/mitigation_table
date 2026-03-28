import lowBlow from '../../../../assets/Low_Blow.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type LowBlow = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function LowBlow({
  addSpell,
  rotationDuration,
  action
}: LowBlow) {
  const cooldown = 60
  const lastLowBlow = [...action].reverse().find((a) => a.name === 'Low_Blow')

  const remainingCooldown = lastLowBlow
    ? Math.max(0, cooldown - (rotationDuration - lastLowBlow.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Low_Blow',
            icon: lowBlow,
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
        <img src={lowBlow} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
