import intervene from '../../../../assets/paladin/Intervene.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Intervene = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Intervene({
  addSpell,
  rotationDuration,
  action
}: Intervene) {
  const cooldown = 30
  const maxCharges = 2

  const uses = action.filter((a) => a.name === 'Intervene').map((a) => a.start)

  let charges = maxCharges
  let remainingCooldown = 0

  if (uses.length > 0) {
    const firstUse = uses[0]
    const elapsed = rotationDuration - firstUse

    const recovered = Math.floor(elapsed / cooldown)

    charges = Math.min(maxCharges, maxCharges - uses.length + recovered)

    if (charges < maxCharges) {
      remainingCooldown = cooldown - (elapsed % cooldown)
    }
  }

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={charges <= 0}
        onClick={() => {
          if (charges <= 0) return

          addSpell({
            name: 'Intervene',
            icon: intervene,
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
        <img src={intervene} width={40} />
      </S.SpellButton>

      {charges < maxCharges && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
