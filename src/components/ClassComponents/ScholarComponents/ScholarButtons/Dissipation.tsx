import dissipation from '../../../../assets/scholar/Dissipation.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Dissipation = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Dissipation({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Dissipation) {
  const cooldown = 180
  const lastDissipation = [...action]
    .reverse()
    .find((a) => a.name === 'Dissipation')

  const remainingCooldown = lastDissipation
    ? Math.max(0, cooldown - (rotationDuration - lastDissipation.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.SummonSeraphDuration > 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.SummonSeraphDuration > 0)
            return

          addSpell({
            name: 'Dissipation',
            icon: dissipation,
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
        <img src={dissipation} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
