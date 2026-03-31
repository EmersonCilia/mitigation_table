import ironWill from '../../../../assets/Iron_Will.png'
import releaseIronWill from '../../../../assets/Release_Iron_Will.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type IronWillCombo = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: PaladinState
}

export default function IronWillCombo({
  addSpell,
  rotationDuration,
  action,
  playerState
}: IronWillCombo) {
  const ironWillCD = 2
  const releaseIronWillCD = 1

  const lastToggle = [...action]
    .reverse()
    .find((a) => a.name === 'Iron_Will' || a.name === 'Release_Iron_Will')

  let remainingCooldown = 0

  if (lastToggle) {
    const cd = lastToggle.name === 'Iron_Will' ? ironWillCD : releaseIronWillCD

    remainingCooldown = Math.max(0, cd - (rotationDuration - lastToggle.start))
  }
  // decide which spell is active
  const ironWillActive = playerState.ironWill

  const spell = ironWillActive
    ? {
        name: 'Release_Iron_Will',
        icon: releaseIronWill
      }
    : {
        name: 'Iron_Will',
        icon: ironWill
      }

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: spell.name,
            icon: spell.icon,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: playerState.ironWill ? ironWillCD : releaseIronWillCD,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={spell.icon} width={40} />
      </S.SpellButton>

      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
