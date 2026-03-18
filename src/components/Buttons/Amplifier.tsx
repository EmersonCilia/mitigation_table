import amplifier from '../../assets/BLM/Amplifier.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type Amplifier = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Amplifier({
  addSpell,
  rotationDuration,
  action
}: Amplifier) {
  const cooldown = 120
  const lastAmplifier = [...action]
    .reverse()
    .find((a) => a.name === 'Amplifier')

  const remainingCooldown = lastAmplifier
    ? Math.max(0, cooldown - (rotationDuration - lastAmplifier.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Amplifier',
            icon: amplifier,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0
          })
        }}
      >
        <img src={amplifier} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
