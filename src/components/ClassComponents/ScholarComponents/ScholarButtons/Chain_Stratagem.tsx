import chainStatagem from '../../../../assets/scholar/Chain_Stratagem.png'
import banefulImpaction from '../../../../assets/scholar/Baneful_Impaction.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ChainStratagem = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Chain_Stratagem({
  addSpell,
  rotationDuration,
  action,
  playerState
}: ChainStratagem) {
  let spell = {
    name: 'Chain_Stratagem',
    icon: chainStatagem,
    enabled: false
  }
  if (playerState.impactImminent > 0) {
    spell = {
      name: 'Baneful_Impaction',
      icon: banefulImpaction,
      enabled: true
    }
  }
  const cooldown = 120
  const lastChainStratagem = [...action]
    .reverse()
    .find((a) => a.name === 'Chain_Stratagem')

  const remainingCooldown = lastChainStratagem
    ? Math.max(0, cooldown - (rotationDuration - lastChainStratagem.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={playerState.impactImminent > 0}
        disabled={remainingCooldown > 0 && playerState.impactImminent <= 0}
        onClick={() => {
          if (remainingCooldown > 0 && playerState.impactImminent <= 0) return

          addSpell({
            name: spell.name,
            icon: spell.icon,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: playerState.impactImminent > 0 ? 0 : cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={spell.icon} width={40} />
        {playerState.impactImminent > 0 && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
      {remainingCooldown > 0 && playerState.impactImminent <= 0 && (
        <span>{remainingCooldown.toFixed(1)}</span>
      )}
    </S.ButtonDiv>
  )
}
