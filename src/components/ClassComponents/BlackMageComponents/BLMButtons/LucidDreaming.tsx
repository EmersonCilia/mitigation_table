import lucidDreaming from '../../../../assets/Lucid_Dreaming.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type LucidDreaming = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function LucidDreaming({
  addSpell,
  rotationDuration,
  action
}: LucidDreaming) {
  const cooldown = 60
  const lastLucidDreaming = [...action]
    .reverse()
    .find((a) => a.name === 'LucidDreaming')

  const remainingCooldown = lastLucidDreaming
    ? Math.max(0, cooldown - (rotationDuration - lastLucidDreaming.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'LucidDreaming',
            icon: lucidDreaming,
            cast: 0.64,
            type: 'ogcd',
            potency: 0,
            requiresTarget: false,
            recast: 0,
            cooldown: cooldown,
            manacost: 0,
            job: 'BLM'
          })
        }}
      >
        <img src={lucidDreaming} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
