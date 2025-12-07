import { db } from './index'
import { ref, set, get, push, onValue, remove } from 'firebase/database'

export type CheckboxMap = {
  [key: string]: boolean
}

export type FightSkill = {
  skill: string
  damagetotal: number
  damagetaken: number
  type: string
  checkbox: CheckboxMap
}

export type Fight = {
  id: string
  name: string
  skills: {
    [skillName: string]: FightSkill
  }
}

export async function createFight(name: string) {
  const fightsRef = ref(db, 'fights')
  const newFightRef = push(fightsRef)

  const fight = {
    id: newFightRef.key!,
    name,
    skills: {}
  }

  await set(newFightRef, fight)

  return fight
}

export async function saveRow(
  fightId: string,
  timer: string,
  data: FightSkill
) {
  const skillRef = ref(db, `fights/${fightId}/skills/${timer}`)
  await set(skillRef, data)
}

export async function getAllFights() {
  const refFights = ref(db, 'fights')
  const snap = await get(refFights)
  return snap.exists() ? snap.val() : {}
}

export async function getOneFight(fightId: string) {
  const fightRef = ref(db, `fights/${fightId}`)
  const snap = await get(fightRef)
  return snap.exists() ? snap.val() : null
}

export async function updateCheckbox(
  fightId: string,
  skillName: string,
  checkboxKey: string,
  value: boolean
) {
  const refCheckbox = ref(
    db,
    `fights/${fightId}/skills/${skillName}/checkbox/${checkboxKey}`
  )

  await set(refCheckbox, value)
}

export function listenForRows(
  fightId: string,
  callback: (rows: any[]) => void
) {
  const rowsRef = ref(db, `fights/${fightId}/skills`)

  onValue(rowsRef, (snapshot) => {
    const data = snapshot.val()

    if (!data) {
      callback([])
      return
    }

    // Convert Firebase object → array of { timer, ...data }
    const rows = Object.entries(data).map(([timer, values]: any) => ({
      id: timer, // use timer as row id
      timer: timer,
      skill: values.skill ?? '',
      damagetotal: values.damagetotal ?? '',
      damagetaken: values.damagetaken ?? '',
      type: values.type ?? 'magical',
      checkbox: values.checkbox ?? {}
    }))

    callback(rows)
  })
}

export async function updateDamageType(
  fightId: string,
  timer: string,
  type: 'magical' | 'physical'
) {
  const typeRef = ref(db, `fights/${fightId}/skills/${timer}/type`)
  await set(typeRef, type)
}

export async function deleteRow(fightId: string, timerKey: string) {
  const rowRef = ref(db, `fights/${fightId}/skills/${timerKey}`)
  await remove(rowRef)
}
