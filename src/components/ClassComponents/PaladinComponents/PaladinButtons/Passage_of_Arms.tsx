import passageofArms from '../../../../assets/paladin/Passage_of_Arms.png'
import { Action } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type PassageofArms = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  rotationDuration: number
  action: Action[]
}

export default function PassageofArms({
  addSpell,
  rotationDuration,
  action
}: PassageofArms) {
  const cooldown = 120
  const lastPassageofArms = [...action]
    .reverse()
    .find((a) => a.name === 'Passage_of_Arms')

  const remainingCooldown = lastPassageofArms
    ? Math.max(0, cooldown - (rotationDuration - lastPassageofArms.start))
    : 0
  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={remainingCooldown > 0}
        onClick={() => {
          if (remainingCooldown > 0) return

          addSpell({
            name: 'Passage_of_Arms',
            icon: passageofArms,
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
        <img src={passageofArms} width={40} />
      </S.SpellButton>
      {remainingCooldown > 0 && <span>{remainingCooldown.toFixed(1)}</span>}
    </S.ButtonDiv>
  )
}
