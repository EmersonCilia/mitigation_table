import atonement from '../../../../assets/paladin/Atonement.png'
import supplication from '../../../../assets/paladin/Supplication.png'
import sepulchre from '../../../../assets/paladin/Sepulchre.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Atonement = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function AtonementCombo({
  addSpell,
  playerState,
  calculateGCD
}: Atonement) {
  const recast = calculateGCD(2500)

  let spell = {
    name: 'Atonement',
    icon: atonement,
    potency: 460,
    enabled: false
  }

  if (playerState.sepulchreReady > 0) {
    spell = {
      name: 'Sepulchre',
      icon: sepulchre,
      potency: 540,
      enabled: true
    }
  } else if (playerState.supplicationReady > 0) {
    spell = {
      name: 'Supplication',
      icon: supplication,
      potency: 500,
      enabled: true
    }
  } else if (playerState.atonementReady > 0) {
    spell = {
      name: 'Atonement',
      icon: atonement,
      potency: 460,
      enabled: true
    }
  }

  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={spell.enabled}
        disabled={!spell.enabled}
        onClick={() => {
          if (!spell.enabled) return

          addSpell({
            name: spell.name,
            icon: spell.icon,
            cast: 0.64,
            type: 'gcd',
            potency:
              playerState.fightOrFlight > 0
                ? spell.potency * 1.2
                : spell.potency,
            requiresTarget: true,
            recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={spell.icon} width={40} />
        {spell.enabled && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
