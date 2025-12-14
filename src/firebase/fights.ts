import { db } from './index'
import { ref, set, get, push, onValue, remove, update } from 'firebase/database'

export type CheckboxMap = {
  [key: string]: boolean
}

export type FightSkill = {
  skill: string
  damagetotal: number
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

/* ---------------- CREATE FIGHT ---------------- */

export async function createFight(groupId: string, name: string) {
  const key = name.replace(/[.#$[\]]/g, '_')

  const idRef = push(ref(db, 'ids'))
  const generatedId = idRef.key

  const fightRef = ref(db, `groups/${groupId}/fights/${key}`)

  const fight = {
    id: generatedId,
    name,
    skills: {}
  }

  await set(fightRef, fight)
  return fight
}

/* ---------------- ROWS ---------------- */

export async function saveRow(
  groupId: string,
  fightId: string,
  timer: string,
  data: FightSkill
) {
  const skillRef = ref(
    db,
    `groups/${groupId}/fights/${fightId}/skills/${timer}`
  )
  await set(skillRef, data)
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
  const refCheckbox = ref(
    db,
    `groups/${groupId}/fights/${fightId}/skills/${skillName}/checkbox/${checkboxKey}`
  )

  await set(refCheckbox, value)
}

/* ---------------- LISTENERS ---------------- */

export function listenForRows(
  groupId: string,
  fightId: string,
  callback: (rows: any[]) => void
) {
  const rowsRef = ref(db, `groups/${groupId}/fights/${fightId}/skills`)

  onValue(rowsRef, (snapshot) => {
    const data = snapshot.val()

    if (!data) {
      callback([])
      return
    }

    const rows = Object.entries(data).map(([timer, values]: any) => ({
      id: timer,
      timer,
      skill: values.skill ?? '',
      damagetotal: values.damagetotal ?? '',
      type: values.type ?? 'magical',
      checkbox: values.checkbox ?? {}
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
  const typeRef = ref(
    db,
    `groups/${groupId}/fights/${fightId}/skills/${timer}/type`
  )
  await set(typeRef, type)
}

export async function deleteRow(
  groupId: string,
  fightId: string,
  timerKey: string
) {
  const rowRef = ref(
    db,
    `groups/${groupId}/fights/${fightId}/skills/${timerKey}`
  )
  await remove(rowRef)
}

export async function deleteFight(groupId: string, fightId: string) {
  const rowRef = ref(db, `groups/${groupId}/fights/${fightId}`)
  await remove(rowRef)
}

/* ---------------- ACTIVE JOBS ---------------- */

export async function updateActiveJobs(
  groupId: string,
  fightId: string,
  activeJobs: string[]
) {
  await update(ref(db, `groups/${groupId}/fights/${fightId}`), {
    activeJobs
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

export async function deleteGroup(groupId: string) {
  await remove(ref(db, `groups/${groupId}`))
}

export async function getGroup(groupId: string) {
  const key = groupId.replace(/[.#$[\]]/g, '_')
  const snapshot = await get(ref(db, `groups/${key}`))

  if (!snapshot.exists()) return null
  return snapshot.val()
}

export async function verifyGroupLogin(groupName: string, password: string) {
  const key = groupName.trim().toLowerCase()
  const groupRef = ref(db, `groups/${key}`)
  const snapshot = await get(groupRef)

  if (!snapshot.exists()) return false

  const group = snapshot.val()
  return group.password === password
}
