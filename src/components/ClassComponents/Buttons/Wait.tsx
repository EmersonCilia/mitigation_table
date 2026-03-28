import { AddSpell } from '../../../Utils/types'

export default function Wait({ addSpell }: AddSpell) {
  return (
    <div>
      <input
        id="waitinput"
        type="text"
        placeholder="seconds"
        style={{ width: '60px' }}
      />

      <button
        onClick={() => {
          const value = (
            document.getElementById('waitinput') as HTMLInputElement
          ).value

          const duration = Number(value)

          if (isNaN(duration) || duration <= 0) {
            return
          }

          addSpell({
            name: 'Wait',
            icon: null,
            cast: duration,
            type: 'ogcd',
            potency: 0,
            recast: 0,
            requiresTarget: false,
            cooldown: 0,
            manacost: 0,
            job: 'BLM'
          })
        }}
      >
        Wait
      </button>
    </div>
  )
}
