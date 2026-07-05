import aetherflow from '../../../../assets/scholar/Aetherflow.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Aetherflow = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Aetherflow({
  addSpell,
  rotationDuration,
  action
}: Aetherflow) {
  const cooldown = 60
  const lastAetherflow = [...action]
    .reverse()
    .find((a) => a.name === 'Aetherflow')

  const remainingCooldown = lastAetherflow
    ? Math.max(0, cooldown - (rotationDuration - lastAetherflow.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Aetherflow',
            icon: aetherflow,
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
        <img src={aetherflow} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
