import feyIllumination from '../../../../assets/scholar/Fey_Illumination-sch.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type FeyIllumination = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function FeyIllumination({
  addSpell,
  rotationDuration,
  action,
  playerState
}: FeyIllumination) {
  const cooldown = 120
  const lastFeyIllumination = [...action]
    .reverse()
    .find((a) => a.name === 'Fey_Illumination')

  const remainingCooldown = lastFeyIllumination
    ? Math.max(0, cooldown - (rotationDuration - lastFeyIllumination.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.dissipation > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Fey_Illumination',
            icon: feyIllumination,
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
        <img src={feyIllumination} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
