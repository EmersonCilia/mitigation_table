import imperator from '../../../../assets/paladin/Imperator.png'
import bladeOfHonor from '../../../../assets/paladin/Blade_of_Honor.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Imperator = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function Imperator({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Imperator) {
  const cooldown = 60
  const lastImperator = [...action]
    .reverse()
    .find((a) => a.name === 'Imperator')

  const remainingCooldown = lastImperator
    ? Math.max(0, cooldown - (rotationDuration - lastImperator.start))
    : 0

  let spell = {
    name: 'Imperator',
    icon: imperator,
    potency: 0,
    cooldown: cooldown,
    enabled: false
  }

  if (playerState.bladeOfHonorReady > 0) {
    spell = {
      name: 'Blade_of_Honor',
      icon: bladeOfHonor,
      potency: 1000,
      cooldown: 0,
      enabled: true
    }
  } else {
    spell = {
      name: 'Imperator',
      icon: imperator,
      potency: 0,
      cooldown: cooldown,
      enabled: true
    }
  }
  return (
    <S.ButtonDiv>
      <S.SpellButton
        $glow={spell.enabled && spell.name === 'Blade_of_Honor'}
        disabled={remainingCooldown > 0 && playerState.bladeOfHonorReady <= 0}
        onClick={() => {
          if (remainingCooldown > 0 && playerState.bladeOfHonorReady <= 0)
            return

          addSpell({
            name: spell.name,
            icon: spell.icon,
            cast: 0.64,
            type: 'ogcd',
            potency:
              playerState.fightOrFlight > 0
                ? spell.potency * 1.2
                : spell.potency,
            requiresTarget: true,
            recast: 0,
            cooldown: spell.cooldown,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={spell.icon} width={40} />
        {spell.enabled && spell.name === 'Blade_of_Honor' && (
          <svg>
            <rect x="1" y="1" width="42" height="42" />
          </svg>
        )}
      </S.SpellButton>
      {spell.name === 'Imperator' && remainingCooldown > 0 && (
        <span>{remainingCooldown.toFixed(1)}</span>
      )}
    </S.ButtonDiv>
  )
}
