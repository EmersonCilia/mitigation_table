import umbralsoul from '../../assets/BLM/Umbral_Soul.png'
import { Action, PlayerState } from '../../Utils/types'
import * as S from './styles'

type UmbralSoul = {
  addSpell: (spell: Omit<Action, 'id' | 'start'>) => void
  playerState: PlayerState
  calculateGCD: (baseGCD: number) => number
}

export default function UmbralSoul({
  addSpell,
  playerState,
  calculateGCD
}: UmbralSoul) {
  const recast = calculateGCD(2500)
  const leylinesModifier = playerState.leylines > 0 ? 0.85 : 1

  return (
    <div>
      <S.SpellButton
        disabled={playerState.umbralIce === 0}
        onClick={() =>
          addSpell({
            name: 'Umbral Soul',
            icon: umbralsoul,
            cast: 0.64,
            type: 'gcd',
            potency: 0,
            recast: recast * leylinesModifier,
            requiresTarget: false,
            cooldown: 0,
            manacost: 0
          })
        }
      >
        <img src={umbralsoul} width={40} />
      </S.SpellButton>
    </div>
  )
}
