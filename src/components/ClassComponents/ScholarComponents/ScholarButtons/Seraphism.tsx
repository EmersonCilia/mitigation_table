import seraphism from '../../../../assets/scholar/Seraphism.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Seraphism = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
  playerState: ScholarState
}

export default function Seraphism({
  addSpell,
  rotationDuration,
  action,
  playerState
}: Seraphism) {
  const cooldown = 180
  const lastSeraphism = [...action]
    .reverse()
    .find((a) => a.name === 'Seraphism')

  const remainingCooldown = lastSeraphism
    ? Math.max(0, cooldown - (rotationDuration - lastSeraphism.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0 || playerState.dissipation > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Seraphism',
            icon: seraphism,
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
        <img src={seraphism} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
