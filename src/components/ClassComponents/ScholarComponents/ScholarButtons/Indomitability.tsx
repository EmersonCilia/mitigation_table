import indomitability from '../../../../assets/scholar/Indomitability.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Indomitability = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Indomitability({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Indomitability) {
  const cooldown = 30
  const lastIndomitability = [...action]
    .reverse()
    .find((a) => a.name === 'Indomitability')

  const remainingCooldown = lastIndomitability
    ? Math.max(0, cooldown - (rotationDuration - lastIndomitability.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.Aetherflow <= 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.Aetherflow <= 0) return

          addSpell({
            name: 'Indomitability',
            icon: indomitability,
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
        <img src={indomitability} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
