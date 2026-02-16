import { RowData } from '../Utils/types'
import { db } from './index'
import { ref, set, get, push, onValue, remove, update } from 'firebase/database'

async function authorizedWrite<T>(
  groupId: string,
  callback: () => Promise<T>
): Promise<T> {
  const authData = JSON.parse(localStorage.getItem('authGroup') || '{}')

  if (!authData?.token || authData.name !== groupId) {
    throw new Error('Not authorized')
  }

  const SESSION_DURATION = 1000 * 60 * 60 * 8 // 8h
  if (Date.now() - authData.loggedAt > SESSION_DURATION) {
    localStorage.removeItem('authGroup')
    throw new Error('Session expired')
  }

  return await callback()
}

export type CheckboxMap = {
  [key: string]: boolean
}

export type FightSkill = {
  skill: string
  damagetotal: number
  type: string
  mechanicType: string
  checkbox: CheckboxMap
}

export type Fight = {
  id: string
  name: string
  skills: {
    [skillName: string]: FightSkill
  }
}

/* ---------------- CREATE FIGHT ---------------- */

export async function createFight(groupId: string, name: string) {
  return authorizedWrite(groupId, async () => {
    const key = name.replace(/[.#$[\]]/g, '_')
    const idRef = push(ref(db, 'ids'))
    const generatedId = idRef.key
    const fightRef = ref(db, `groups/${groupId}/fights/${key}`)

    const fight = { id: generatedId, name, skills: {} }
    await set(fightRef, fight)
    return fight
  })
}

/* ---------------- ROWS ---------------- */

export async function saveRow(
  groupId: string,
  fightId: string,
  timer: string,
  data: FightSkill
) {
  return authorizedWrite(groupId, async () => {
    const skillRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${timer}`
    )
    await set(skillRef, data)
  })
}

/* ---------------- READ ---------------- */

export async function getAllFights(groupId: string) {
  const refFights = ref(db, `groups/${groupId}/fights`)
  const snap = await get(refFights)
  return snap.exists() ? snap.val() : {}
}

export async function getOneFight(groupId: string, fightId: string) {
  const fightRef = ref(db, `groups/${groupId}/fights/${fightId}`)
  const snap = await get(fightRef)
  return snap.exists() ? snap.val() : null
}

/* ---------------- CHECKBOX ---------------- */

export async function updateCheckbox(
  groupId: string,
  fightId: string,
  skillName: string,
  checkboxKey: string,
  value: boolean
) {
  return authorizedWrite(groupId, async () => {
    const refCheckbox = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${skillName}/checkbox/${checkboxKey}`
    )
    await set(refCheckbox, value)
  })
}

/* ---------------- LISTENERS ---------------- */

export function listenForRows(
  groupId: string,
  fightId: string,
  callback: (rows: RowData[]) => void
) {
  const rowsRef = ref(db, `groups/${groupId}/fights/${fightId}/skills`)

  onValue(rowsRef, (snapshot) => {
    const data = snapshot.val() as Record<string, RowData> | null

    if (!data) {
      callback([])
      return
    }

    const rows: RowData[] = Object.entries(data).map(([timer, values]) => ({
      id: timer,
      timer,
      skill: values.skill ?? '',
      damagetotal: values.damagetotal ?? '',
      type: values.type ?? 'magical',
      checkbox: values.checkbox ?? {},
      mechanicType: values.mechanicType
    }))

    callback(rows)
  })
}

/* ---------------- UPDATES ---------------- */

export async function updateDamageType(
  groupId: string,
  fightId: string,
  timer: string,
  type: 'magical' | 'physical'
) {
  return authorizedWrite(groupId, async () => {
    const typeRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${timer}/type`
    )
    await set(typeRef, type)
  })
}

export async function deleteRow(
  groupId: string,
  fightId: string,
  timerKey: string
) {
  return authorizedWrite(groupId, async () => {
    const rowRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${timerKey}`
    )
    await remove(rowRef)
  })
}

export async function deleteFight(groupId: string, fightId: string) {
  return authorizedWrite(groupId, async () => {
    const fightRef = ref(db, `groups/${groupId}/fights/${fightId}`)
    await remove(fightRef)
  })
}

/* ---------------- ACTIVE JOBS ---------------- */

export async function updateActiveJobs(
  groupId: string,
  fightId: string,
  activeJobs: string[]
) {
  return authorizedWrite(groupId, async () => {
    await update(ref(db, `groups/${groupId}/fights/${fightId}`), {
      activeJobs
    })
  })
}

export function listenForActiveJobs(
  groupId: string,
  fightId: string,
  callback: (jobs: string[]) => void
) {
  const activeRef = ref(db, `groups/${groupId}/fights/${fightId}/activeJobs`)

  onValue(activeRef, (snap) => {
    callback(snap.exists() ? snap.val() : [])
  })
}

/* ---------------- GROUPS ---------------- */

export async function createGroup(name: string, password: string) {
  const key = name.trim().toLowerCase()
  const groupRef = ref(db, `groups/${key}`)

  const snapshot = await get(groupRef)
  if (snapshot.exists()) {
    throw new Error('Group already exists')
  }

  await set(groupRef, {
    name: key,
    password,
    createdAt: Date.now()
  })
}

export async function getGroup(groupId: string) {
  const key = groupId.replace(/[.#$[\]]/g, '_')
  const snapshot = await get(ref(db, `groups/${key}`))

  if (!snapshot.exists()) return null
  return snapshot.val()
}
