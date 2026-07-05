import energyDrain from '../../../../assets/scholar/Energy_Drain.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type EnergyDrain = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function EnergyDrain({
  addSpell,
  rotationDuration,
  action,
  playerState
}: EnergyDrain) {
  const cooldown = 1
  const lastEnergyDrain = [...action]
    .reverse()
    .find((a) => a.name === 'Energy_Drain')

  const remainingCooldown = lastEnergyDrain
    ? Math.max(0, cooldown - (rotationDuration - lastEnergyDrain.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.Aetherflow <= 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.Aetherflow <= 0) return

          addSpell({
            name: 'Energy_Drain',
            icon: energyDrain,
            cast: 0.64,
            type: 'ogcd',
            potency: 100,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={energyDrain} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
