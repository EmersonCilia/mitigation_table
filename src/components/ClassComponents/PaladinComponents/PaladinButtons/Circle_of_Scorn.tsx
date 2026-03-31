import circleOfScorn from '../../../../assets/paladin/Circle_of_Scorn.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type CircleOfScorn = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function CircleOfScorn({
  addSpell,
  rotationDuration,
  action,
  playerState
}: CircleOfScorn) {
  const cooldown = 30
  const lastCircleOfScorn = [...action]
    .reverse()
    .find((a) => a.name === 'Circle_Of_Scorn')

  const remainingCooldown = lastCircleOfScorn
    ? Math.max(0, cooldown - (rotationDuration - lastCircleOfScorn.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Circle_Of_Scorn',
            icon: circleOfScorn,
            cast: 0.64,
            type: 'ogcd',
            potency: playerState.fightOrFlight > 0 ? 140 * 1.2 : 140,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            dotDuration: 15,
            dotInterval: 3,
            dotPotency: playerState.fightOrFlight > 0 ? 30 * 1.2 : 30,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={circleOfScorn} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
