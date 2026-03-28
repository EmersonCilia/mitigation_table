import highFireII from '../../../../assets/BLM/High_Fire_II.png'
import { Action, BlackMageState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type HighFireII = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
}

export default function HighFireII({
  addSpell,
  playerState,
  calculateGCD
}: HighFireII) {
  const cast = calculateGCD(3000)
  const recast = calculateGCD(2500)

  const manaCostOnFire = playerState.astralFire === 0 ? 1500 : 3000
  const manaCost =
    playerState.umbralHearts === 0 ? manaCostOnFire : manaCostOnFire / 2

  const disabled = playerState.mana < manaCost
  const castTime =
    playerState.triplecast > 0 || playerState.swiftcast
      ? 0.64
      : playerState.umbralIce === 3
        ? cast / 2
        : cast
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 100

  if (playerState.astralFire === 1) {
    potency *= 1.4
  } else if (playerState.astralFire === 2) {
    potency *= 1.6
  } else if (playerState.astralFire === 3) {
    potency *= 1.8
  } else if (playerState.umbralIce === 1) {
    potency *= 0.9
  } else if (playerState.umbralIce === 2) {
    potency *= 0.8
  } else if (playerState.umbralIce === 3) {
    potency *= 0.7
  }

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <S.SpellButton
      disabled={disabled}
      onClick={() =>
        addSpell({
          name: 'High Fire II',
          icon: highFireII,
          cast: castTime * leylinesModifier,
          type: 'gcd',
          potency: potency,
          recast: recast * leylinesModifier,
          requiresTarget: true,
          cooldown: 0,
          manacost: manaCost,
          job: 'BLM'
        })
      }
    >
      <img src={highFireII} width={40} />
    </S.SpellButton>
  )
}
