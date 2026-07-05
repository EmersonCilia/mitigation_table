import artOfWar from '../../../../assets/scholar/Art_of_War_II.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type ArtOfWar = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: ScholarState
  calculateGCD: (baseGCD: number) => number
}

export default function ArtOfWar({
  addSpell,
  playerState,
  calculateGCD
}: ArtOfWar) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={playerState.mana < 400}
        onClick={() => {
          addSpell({
            name: 'Art_Of_War',
            icon: artOfWar,
            cast: 0.64,
            type: 'gcd',
            potency: 165,
            requiresTarget: true,
            recast: recast,
            cooldown: 0,
            manacost: 400,
            job: 'SCH'
          })
        }}
      >
        <img src={artOfWar} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
