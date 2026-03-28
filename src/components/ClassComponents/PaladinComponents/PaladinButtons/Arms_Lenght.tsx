import armsLenght from '../../../../assets/Arms_Length.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ArmsLenght = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function ArmsLenght({
  addSpell,
  rotationDuration,
  action
}: ArmsLenght) {
  const cooldown = 120
  const lastArmsLenght = [...action]
    .reverse()
    .find((a) => a.name === 'Arms_Lenght')

  const remainingCooldown = lastArmsLenght
    ? Math.max(0, cooldown - (rotationDuration - lastArmsLenght.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Arms_Lenght',
            icon: armsLenght,
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
        <img src={armsLenght} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
