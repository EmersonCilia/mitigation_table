import { Downtime } from '../../../Utils/types'

type AddDowntimeProps = {
  addDowntime: (downtime: Downtime) => void
}

export default function AddDowntime({ addDowntime }: AddDowntimeProps) {
  return (
    <div>
      <input
        id="downtimestartinput"
        type="text"
        placeholder="start"
        style={{ width: '60px' }}
      />

      <input
        id="downtimedurationinput"
        type="text"
        placeholder="duration"
        style={{ width: '60px' }}
      />

      <button
        onClick={() => {
          const startValue = (
            document.getElementById('downtimestartinput') as HTMLInputElement
          ).value

          const durationValue = (
            document.getElementById('downtimedurationinput') as HTMLInputElement
          ).value

          const start = Number(startValue)
          const duration = Number(durationValue)

          if (isNaN(start) || isNaN(duration) || duration <= 0) {
            return
          }

          addDowntime({
            id: crypto.randomUUID(),
            start,
            duration
          })
        }}
      >
        Add Downtime
      </button>
    </div>
  )
}
