import aetherialManipulation from '../../assets/BLM/Aetherial_Manipulation.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type AetherialManipulation = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Manafont({
  addSpell,
  rotationDuration,
  action
}: AetherialManipulation) {
  const cooldown = 3
  const lastAetherialManipulation = [...action]
    .reverse()
    .find((a) => a.name === 'Aetherial Manipulation')

  const remainingCooldown = lastAetherialManipulation
    ? Math.max(
        0,
        cooldown - (rotationDuration - lastAetherialManipulation.start)
      )
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Aetherial Manipulation',
            icon: aetherialManipulation,
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
        <img src={aetherialManipulation} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
