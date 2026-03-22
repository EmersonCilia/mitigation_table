import manafont from '../../assets/BLM/Manafont.png'
import { Action } from '../../Utils/types'
import * as S from './styles'

type Manafont = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function Manafont({
  addSpell,
  rotationDuration,
  action
}: Manafont) {
  const cooldown = 100
  const lastManafont = [...action].reverse().find((a) => a.name === 'Manafont')

  const remainingCooldown = lastManafont
    ? Math.max(0, cooldown - (rotationDuration - lastManafont.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Manafont',
            icon: manafont,
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
        <img src={manafont} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
