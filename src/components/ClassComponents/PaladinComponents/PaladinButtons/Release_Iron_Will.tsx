import releaseIronWill from '../../../../assets/Release_Iron_Will.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ReleaseIronWill = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function ReleaseIronWill({
  addSpell,
  rotationDuration,
  action
}: ReleaseIronWill) {
  const cooldown = 1
  const lastReleaseIronWill = [...action]
    .reverse()
    .find((a) => a.name === 'Release_Iron_Will')

  const remainingCooldown = lastReleaseIronWill
    ? Math.max(0, cooldown - (rotationDuration - lastReleaseIronWill.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Release_Iron_Will',
            icon: releaseIronWill,
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
        <img src={releaseIronWill} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
