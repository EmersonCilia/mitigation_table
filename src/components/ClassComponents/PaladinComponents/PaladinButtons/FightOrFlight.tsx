import fightorFlight from '../../../../assets/paladin/Fight_or_Flight.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type FightorFlight = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function FightorFlight({
  addSpell,
  rotationDuration,
  action
}: FightorFlight) {
  const cooldown = 60
  const lastFightorFlight = [...action]
    .reverse()
    .find((a) => a.name === 'Fight_or_Flight')

  const remainingCooldown = lastFightorFlight
    ? Math.max(0, cooldown - (rotationDuration - lastFightorFlight.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Fight_or_Flight',
            icon: fightorFlight,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={fightorFlight} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
