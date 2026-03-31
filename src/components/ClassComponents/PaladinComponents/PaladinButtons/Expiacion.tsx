import expiacion from '../../../../assets/paladin/Expiacion.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Expiacion = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function Expiacion({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Expiacion) {
  const cooldown = 30
  const lastExpiacion = [...action]
    .reverse()
    .find((a) => a.name === 'Expiacion')

  const remainingCooldown = lastExpiacion
    ? Math.max(0, cooldown - (rotationDuration - lastExpiacion.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Expiacion',
            icon: expiacion,
            cast: 0.64,
            type: 'ogcd',
            potency: playerState.fightOrFlight > 0 ? 450 * 1.2 : 450,
            requiresTarget: true,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={expiacion} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
