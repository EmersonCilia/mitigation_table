import blizzardIV from '../../../../assets/BLM/Blizzard_IV.png'
import { Action, BlackMageState } from '../../../../Utils/types'
import * as S from '../../Buttons/styles'

type BlizardIII = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: BlackMageState
  calculateGCD: (baseGCD: number) => number
}

export default function BlizzardIV({
  addSpell,
  playerState,
  calculateGCD
}: BlizardIII) {
  const cast = calculateGCD(2000)
  const recast = calculateGCD(2500)

  let finalCast = cast
  if (playerState.swiftcast || playerState.triplecast > 0) {
    finalCast = 0.64
  }
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1
  let potency = 300
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
        disabled={playerState.umbralIce === 0}
        onClick={() =>
          addSpell({
            name: 'Blizzard IV',
            icon: blizzardIV,
            cast: finalCast * leylinesModifier,
            type: 'gcd',
            potency: potency,
            recast: recast * leylinesModifier,
            requiresTarget: true,
            cooldown: 0,
            manacost: 0,
            job: 'BLM'
          })
        }
      >
        <img src={blizzardIV} width={40} />
      </S.SpellButton>
    </div>
  )
}
