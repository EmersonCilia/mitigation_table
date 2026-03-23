import { toSeconds } from '../Utils/ToSeconds'
import { Action, Downtime, RowData } from '../Utils/types'
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
  id: string,
  data: Omit<RowData, 'id'>
) {
  return authorizedWrite(groupId, async () => {
    const skillRef = ref(db, `groups/${groupId}/fights/${fightId}/skills/${id}`)
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
  skillId: string,
  checkboxKey: string,
  value: boolean
) {
  return authorizedWrite(groupId, async () => {
    const refCheckbox = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${skillId}/checkbox/${checkboxKey}`
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

    const rows: RowData[] = Object.entries(data).map(([id, values]) => ({
      id: id,
      timer: values.timer ?? id, //remove id to '' later
      skill: values.skill ?? '',
      damagetotal: values.damagetotal ?? '',
      type: values.type ?? 'magical',
      checkbox: values.checkbox ?? {},
      mechanicType: values.mechanicType
    }))
    rows.sort((a, b) => toSeconds(a.timer) - toSeconds(b.timer))

    callback(rows)
  })
}
export function listenForBossSkills(
  groupId: string,
  fightId: string,
  callback: (skills: { name: string; start: number }[]) => void
) {
  const rowsRef = ref(db, `groups/${groupId}/fights/${fightId}/skills`)

  const unsubscribe = onValue(rowsRef, (snapshot) => {
    const data = snapshot.val() as Record<string, RowData> | null
    if (!data) {
      callback([])
      return
    }

    const skills = Object.values(data).map((row: RowData) => ({
      name: row.skill,
      start: toSeconds(row.timer)
    }))

    callback(skills)
  })

  return unsubscribe
}
export function listenForRotation(
  groupId: string,
  fightId: string,
  jobId: string,
  callback: (actions: Action[]) => void
) {
  const rotationRef = ref(
    db,
    `groups/${groupId}/fights/${fightId}/rotation/${jobId}`
  )

  const unsubscribe = onValue(rotationRef, (snapshot) => {
    const data = snapshot.val()
    if (!data) {
      callback([])
      return
    }
    callback(data.actions || [])
  })

  return unsubscribe
}

/* ---------------- UPDATES ---------------- */

export async function updateDamageType(
  groupId: string,
  fightId: string,
  id: string,
  type: 'magical' | 'physical'
) {
  return authorizedWrite(groupId, async () => {
    const typeRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${id}/type`
    )
    await set(typeRef, type)
  })
}

export async function deleteRow(
  groupId: string,
  fightId: string,
  idkey: string
) {
  return authorizedWrite(groupId, async () => {
    const rowRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/skills/${idkey}`
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

/* ---------------- ROTATION ---------------- */
/**
 * Saves a rotation to the database.
 *
 * Only updates changed fields to avoid overwriting the DB unnecessarily.
 * For the original simpler implementation, see note [1] below.
 *
 * @param groupId - The group ID
 * @param fightId - The fight ID
 * @param jobId - The job ID
 * @param rotation - The rotation object to save
 *
 * @see [1] Original saveRotation implementation
 */
export async function saveRotation(
  groupId: string,
  fightId: string,
  jobId: string,
  rotation: {
    spellSpeed: number
    timelineStart: number
    actions: Action[]
    downtimes: Downtime[]
  }
) {
  return authorizedWrite(groupId, async () => {
    const rotationRef = ref(
      db,
      `groups/${groupId}/fights/${fightId}/rotation/${jobId}`
    )

    const snap = await get(rotationRef)

    if (!snap.exists()) {
      // no rotation yet, create everything
      await set(rotationRef, rotation)
      return
    }
    type RotationUpdates = {
      spellSpeed?: number
      timelineStart?: number
      actions?: Action[]
      downtimes?: Downtime[]
    }
    // rotation exists, only update changed fields
    const current = snap.val()

    const updates: RotationUpdates = {}

    if (JSON.stringify(rotation.actions) !== JSON.stringify(current.actions)) {
      updates.actions = rotation.actions
    }
    if (
      JSON.stringify(rotation.downtimes) !== JSON.stringify(current.downtimes)
    ) {
      updates.downtimes = rotation.downtimes
    }
    if (rotation.spellSpeed !== current.spellSpeed) {
      updates.spellSpeed = rotation.spellSpeed
    }
    if (rotation.timelineStart !== current.timelineStart) {
      updates.timelineStart = rotation.timelineStart
    }
    if (Object.keys(updates).length > 0) {
      await update(rotationRef, updates)
    }
  })
}

export async function getRotation(
  groupId: string,
  fightId: string,
  jobId: string
) {
  const rotationRef = ref(
    db,
    `groups/${groupId}/fights/${fightId}/rotation/${jobId}`
  )

  const snap = await get(rotationRef)
  return snap.exists() ? snap.val() : null
}

// fetch boss skills for a fight
export async function getBossSkills(groupId: string, fightId: string) {
  const fight = await getOneFight(groupId, fightId)
  if (!fight || !fight.skills) return []

  const skillsObj = fight.skills as Record<string, Omit<RowData, 'id'>>

  // fight.skills is an object keyed by skillId
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(skillsObj).map(([id, skill]) => ({
    name: skill.skill,
    start: toSeconds(skill.timer) // convert timer string like '00:15' to seconds
  }))
}

/**
 * [1] Original saveRotation function:
 *
 * ```
 * export async function saveRotation(
 *   groupId: string,
 *   fightId: string,
 *   jobId: string,
 *   rotation: { spellSpeed: number, timelineStart: number, actions: Action[], downtimes: Downtime[] }
 * ) {
 *   return authorizedWrite(groupId, async () => {
 *     const rotationRef = ref(db, `groups/${groupId}/fights/${fightId}/rotation/${jobId}`)
 *     await set(rotationRef, rotation)
 *   })
 * }
 *
 * This version was O(k) on writes because it overwrote the entire rotation.
 */
