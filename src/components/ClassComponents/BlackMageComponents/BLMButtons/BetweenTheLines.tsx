import betweenTheLines from '../../../../assets/BLM/Between_the_Lines.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BetweenTheLines = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Manafont({
  addSpell,
  rotationDuration,
  action
}: BetweenTheLines) {
  const cooldown = 3
  const lastBetweenTheLines = [...action]
    .reverse()
    .find((a) => a.name === 'Between The Lines')

  const remainingCooldown = lastBetweenTheLines
    ? Math.max(0, cooldown - (rotationDuration - lastBetweenTheLines.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Between The Lines',
            icon: betweenTheLines,
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
        <img src={betweenTheLines} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
