import highBlizzardII from '../../../assets/BLM/High_Blizzard_II.png'
import { Action, PlayerState } from '../../../Utils/types'
import * as S from '../styles'

type HighBlizzardII = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function HighBlizzardII({
  addSpell,
  playerState,
  calculateGCD
}: HighBlizzardII) {
  const cast = calculateGCD(3000)
  const recast = calculateGCD(2500)

  let finalCast = cast

  if (playerState.swiftcast || playerState.triplecast > 0) {
    finalCast = 0.64
  } else if (playerState.astralFire === 3) {
    finalCast = cast / 2
  }
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1

  let potency = 100

  if (playerState.astralFire === 1) {
    potency *= 0.9
  } else if (playerState.astralFire === 2) {
    potency *= 0.8
  } else if (playerState.astralFire === 3) {
    potency *= 0.7
  }

  if (playerState.astralFire > 0 || playerState.umbralIce > 0) {
    potency *= 1.27
  }
  return (
    <div>
      <S.SpellButton
        onClick={() =>
          addSpell({
            name: 'High Blizzard II',
            icon: highBlizzardII,
            cast: finalCast * leylinesModifier,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost:
              playerState.astralFire === 0 && playerState.umbralIce === 0
                ? 0
                : 800,
            job: 'BLM'
          })
        }
      >
        <img src={highBlizzardII} width={40} />
      </S.SpellButton>
    </div>
  )
}
