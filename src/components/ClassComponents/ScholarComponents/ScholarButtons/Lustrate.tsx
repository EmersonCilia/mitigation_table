import lustrate from '../../../../assets/scholar/Lustrate.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Lustrate = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Lustrate({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Lustrate) {
  const cooldown = 1
  const lastLustrate = [...action].reverse().find((a) => a.name === 'Lustrate')

  const remainingCooldown = lastLustrate
    ? Math.max(0, cooldown - (rotationDuration - lastLustrate.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.Aetherflow <= 0}
        onClick={() => {
          if (remainingCooldown > 0 || playerState.Aetherflow <= 0) return

          addSpell({
            name: 'Lustrate',
            icon: lustrate,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'SCH'
          })
        }}
      >
        <img src={lustrate} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
