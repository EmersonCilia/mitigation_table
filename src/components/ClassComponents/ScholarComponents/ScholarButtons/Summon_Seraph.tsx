import summonSeraph from '../../../../assets/scholar/Summon_Seraph.png'
import consolation from '../../../../assets/scholar/Consolation.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'
import Dissipation from './Dissipation'

type SummonSeraph = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function SummonSeraph({
  addSpell,
  rotationDuration,
  action,
  playerState
}: SummonSeraph) {
  let spell = {
    name: 'Summon_Seraph',
    icon: summonSeraph,
    enabled: false
  }
  if (
    playerState.SummonSeraphDuration > 0 &&
    playerState.summonSeraphStack > 0
  ) {
    spell = {
      name: 'Consolation',
      icon: consolation,
      enabled: true
    }
  }
  const cooldown = 120
  const lastSummonSeraph = [...action]
    .reverse()
    .find((a) => a.name === 'Summon_Seraph')

  const remainingCooldown = lastSummonSeraph
    ? Math.max(0, cooldown - (rotationDuration - lastSummonSeraph.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={
          (playerState.SummonSeraphDuration <= 0 && remainingCooldown > 0) ||
          (playerState.SummonSeraphDuration > 0 &&
            playerState.summonSeraphStack <= 0) ||
          playerState.dissipation > 0
        }
        onClick={() => {
          if (playerState.SummonSeraphDuration <= 0 && remainingCooldown > 0)
            return

          addSpell({
            name: spell.name,
            icon: spell.icon,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown:
              playerState.SummonSeraphDuration > 0 &&
              playerState.summonSeraphStack > 0
                ? 0
                : cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={spell.icon} width={40} />
      </S.SpellButton>
      {playerState.SummonSeraphDuration <= 0 && remainingCooldown > 0 && (
        <span>{remainingCooldown.toFixed(1)}</span>
      )}
    </S.ButtonDiv>
  )
}
