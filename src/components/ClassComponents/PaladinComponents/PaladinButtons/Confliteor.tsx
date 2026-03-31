import confliteor from '../../../../assets/paladin/Confiteor.png'
import bladeFaith from '../../../../assets/paladin/Blade_of_Faith.png'
import bladeTruth from '../../../../assets/paladin/Blade_of_Truth.png'
import bladeValor from '../../../../assets/paladin/Blade_of_Valor.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Confliteor = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
}

export default function ConfiteorCombo({ addSpell, playerState }: Confliteor) {
  let spell = {
    name: 'Confliteor',
    icon: confliteor,
    potency: playerState.requiescat > 0 ? 1000 : 500,
    enabled: false
  }
  if (playerState.bladeOfValorReady > 0) {
    spell = {
      name: 'Blade_of_Valor',
      icon: bladeValor,
      potency: playerState.requiescat > 0 ? 1000 : 500,
      enabled: true
    }
  } else if (playerState.bladeOfTruthReady > 0) {
    spell = {
      name: 'Blade_of_Truth',
      icon: bladeTruth,
      potency: playerState.requiescat > 0 ? 880 : 380,
      enabled: true
    }
  } else if (playerState.bladeOfFaithReady > 0) {
    spell = {
      name: 'Blade_of_Faith',
      icon: bladeFaith,
      potency: playerState.requiescat > 0 ? 760 : 260,
      enabled: true
    }
  } else if (playerState.confliteorReady > 0) {
    spell = {
      name: 'Confliteor',
      icon: confliteor,
      potency: playerState.requiescat > 0 ? 1000 : 500,
      enabled: true
    }
  }
  const manaCost = 1000

  spell.enabled = spell.enabled && playerState.mana >= manaCost

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
            recast: 2.5,
            cooldown: 0,
            manacost: manaCost,
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
