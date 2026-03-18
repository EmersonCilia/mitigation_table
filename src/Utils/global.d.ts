import { Action, Downtime } from '../utils/Types'

declare global {
  interface Window {
    addAction: (action: Action) => void
    addDowntime: (downtime: Downtime) => void
  }
}

export {}
