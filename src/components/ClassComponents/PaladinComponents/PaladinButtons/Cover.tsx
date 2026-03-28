import cover from '../../../../assets/paladin/Cover.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Cover = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Cover({ addSpell, rotationDuration, action }: Cover) {
  const cooldown = 120
  const lastCover = [...action].reverse().find((a) => a.name === 'Cover')

  const remainingCooldown = lastCover
    ? Math.max(0, cooldown - (rotationDuration - lastCover.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Cover',
            icon: cover,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            oathcost: 50,
            job: 'PLD'
          })
        }}
      >
        <img src={cover} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
