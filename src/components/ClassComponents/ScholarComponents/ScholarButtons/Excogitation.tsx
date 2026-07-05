import excogitation from '../../../../assets/scholar/Excogitation.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Excogitation = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Excogitation({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Excogitation) {
  const cooldown = 45
  const lastExcogitation = [...action]
    .reverse()
    .find((a) => a.name === 'Excogitation')

  const remainingCooldown = lastExcogitation
    ? Math.max(0, cooldown - (rotationDuration - lastExcogitation.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.Aetherflow <= 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.Aetherflow <= 0) return

          addSpell({
            name: 'Excogitation',
            icon: excogitation,
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
        <img src={excogitation} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
