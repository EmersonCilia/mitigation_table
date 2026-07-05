import sacredSoil from '../../../../assets/scholar/Sacred_Soil.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type SacredSoil = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function SacredSoil({
  addSpell,
  rotationDuration,
  action,
  playerState
}: SacredSoil) {
  const cooldown = 30
  const lastSacredSoil = [...action]
    .reverse()
    .find((a) => a.name === 'Sacred_Soil')

  const remainingCooldown = lastSacredSoil
    ? Math.max(0, cooldown - (rotationDuration - lastSacredSoil.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.Aetherflow <= 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.Aetherflow <= 0) return

          addSpell({
            name: 'Sacred_Soil',
            icon: sacredSoil,
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
        <img src={sacredSoil} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
