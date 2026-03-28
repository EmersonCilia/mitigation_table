import swiftcast from '../../../../assets/Swiftcast.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Swiftcast = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Swiftcast({
  addSpell,
  rotationDuration,
  action
}: Swiftcast) {
  const cooldown = 40
  const lastSwiftcast = [...action]
    .reverse()
    .find((a) => a.name === 'Swiftcast')

  const remainingCooldown = lastSwiftcast
    ? Math.max(0, cooldown - (rotationDuration - lastSwiftcast.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Swiftcast',
            icon: swiftcast,
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
        <img src={swiftcast} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
