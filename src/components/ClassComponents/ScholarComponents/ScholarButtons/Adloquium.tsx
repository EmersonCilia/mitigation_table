import adloquium from '../../../../assets/scholar/Adloquium.png'
import { Action, ScholarState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type Adloquium = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: ScholarState
  calculateGCD: (baseGCD: number) => number
}

export default function Adloquium({
  addSpell,
  playerState,
  calculateGCD
}: Adloquium) {
  const recast = calculateGCD(2500)
  const cast = calculateGCD(2000)

  return (
    <S.ButtonDiv>
      <S.SpellButton
        disabled={playerState.mana < 900}
        onClick={() => {
          addSpell({
            name: 'Adloquium',
            icon: adloquium,
            cast: playerState.swiftcast > 0 ? 0.64 : cast,
            type: 'gcd',
            potency: 0,
            requiresTarget: false,
            recast: recast,
            cooldown: 0,
            manacost: 900,
            job: 'SCH',
            healingpotency: 300
          })
        }}
      >
        <img src={adloquium} width={40} />
      </S.SpellButton>
    </S.ButtonDiv>
  )
}
