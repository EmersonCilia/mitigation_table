import riotBlade from '../../../../assets/paladin/Riot_Blade.png'
import { Action, PaladinState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type RiotBlade = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PaladinState
  calculateGCD: (baseGCD: number) => number
}

export default function RiotBlade({
  addSpell,
  playerState,
  calculateGCD
}: RiotBlade) {
  const recast = calculateGCD(2500)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        onClick={() => {
          addSpell({
            name: 'Riot_Blade',
            icon: riotBlade,
            cast: 0.64,
            type: 'gcd',
            potency: 0,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 0,
            job: 'PLD'
          })
        }}
      >
        <img src={riotBlade} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
