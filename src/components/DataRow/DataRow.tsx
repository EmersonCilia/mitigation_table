import React, { JSX, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import {
  deleteRow,
  updateCheckbox,
  updateDamageType
} from '../../firebase/fights'

import { jobSkills } from '../Data/JobSkills'
import { mitigationsData } from '../Data/MitigationData'

import { Row, Scrolable, Sticky } from '../../Pages/Spreadsheet/Styles'
import * as S from './styles'

import calculateMitigation from '../../Utils/mitigationCalculator'
import { resolveMitigationState } from '../../Utils/resolveMitigationActive'
import { toSeconds } from '../../Utils/ToSeconds'

import { ColorState, RowStructure } from '../../Utils/types'
import { colors } from '../../styles'
import trashCan from '../../assets/trash_can.svg'

const DataRow = ({
  row,
  rows,
  activeJobs,
  activations,
  skillVisibility,
  visibleJobs,
  mainTank
}: RowStructure): JSX.Element | null => {
  /**
   * Route params (can be undefined on first render)
   */
  const { groupId, fightId } = useParams<{
    groupId?: string
    fightId?: string
  }>()
  /**
   * Always work with safe values.
   * This avoids conditional hooks and hook-order violations.
   */
  const safeGroupId = groupId ?? ''
  const safeFightId = fightId ?? ''

  /**
   * Stable key used by Firestore updates
   */
  const rowKey = row.id
  /**
   * Convert timer string (e.g. "01:23") into seconds
   *
   * Why useMemo?
   * - Parsing time is pure
   * - Used multiple times
   * - No reason to recompute on every render
   */
  const currentTime = useMemo(() => {
    return toSeconds(row.timer)
  }, [row.timer])

  /**
   * Maps mechanic type → background color
   *
   * useCallback keeps the function identity stable,
   * so React.memo children don't re-render unnecessarily.
   */
  const getMechanicColor = useCallback((type?: string) => {
    switch (type) {
      case 'tankbusterMT':
        return colors.blueMT
      case 'tankbusterOT':
        return colors.blueOT
      case 'raidwide':
        return colors.red
      case 'debuff':
        return colors.green
      default:
        return colors.background
    }
  }, [])

  /**
   * PRECOMPUTE ALL mitigation states.
   *
   * What this does:
   * - Iterates jobs + skills ONCE
   * - Computes resolveMitigationState ONCE
   * - Stores results in a flat lookup table
   *
   * What this avoids:
   * Re-running heavy logic inside JSX
   * Mutating objects during render
   * Nested loops during every re-render
   */
  const mitigationStateMap = useMemo(() => {
    const map: Record<string, ColorState> = {}
    Object.entries(jobSkills).forEach(([jobName, skills], jobIndex) => {
      if (!activeJobs.includes(jobName)) return
      const jobIndexStr = String(jobIndex)

      skills.forEach((skill) => {
        const activationTimes = activations?.[jobIndexStr]?.[skill.alt] ?? []
        const mitInfo =
          mitigationsData[skill.alt as keyof typeof mitigationsData]
        if (skill.alt === 'Holy_Sheltron') {
          // add Knight's Resolve as a linked mitigation
          map[`${jobName}-Knights_Resolve`] = resolveMitigationState(
            currentTime,
            activationTimes,
            4,
            mitInfo?.cooldown ?? 0,
            rows,
            'Knights_Resolve',
            mitInfo?.type
          ) as ColorState
        }
        map[`${jobName}-${skill.alt}`] = resolveMitigationState(
          currentTime,
          activationTimes,
          mitInfo?.duration ?? 0,
          mitInfo?.cooldown ?? 0,
          rows,
          skill.alt,
          mitInfo?.type
        ) as ColorState
      })
    })
    return map
  }, [activeJobs, activations, currentTime, rows])

  /**
   * Build the activeMitigations structure used by
   * calculateMitigation().
   *
   * This is DERIVED DATA:
   * - no side effects
   * - no mutations during render
   */
  const activeMitigations = useMemo(() => {
    const result: Record<string, Record<string, boolean>> = {}
    Object.entries(mitigationStateMap).forEach(([key, state]) => {
      if (state !== 'green') return

      const [jobName, skillAlt] = key.split('-')
      result[jobName] ??= {}
      result[jobName][skillAlt] = true
    })
    return result
  }, [mitigationStateMap])

  /**
   * Checkbox handler
   *
   * useCallback prevents re-creating the function
   * for every checkbox on every render.
   */
  const handleCheckboxChange = useCallback(
    async (checkboxKey: string, value: boolean) => {
      if (!safeGroupId || !safeFightId) return

      await updateCheckbox(safeGroupId, safeFightId, rowKey, checkboxKey, value)
    },
    [safeGroupId, safeFightId, rowKey]
  )

  /**
   * EARLY RETURN MUST COME AFTER ALL HOOKS
   */
  if (!safeGroupId || !safeFightId) return null

  return (
    <Row>
      <Sticky>
        <S.TrashCan
          style={{ borderBottom: '1px solid black' }}
          src={trashCan}
          alt="trashCan"
          onClick={() => {
            if (window.confirm('Delete this row?')) {
              deleteRow(safeGroupId, safeFightId, row.id)
            }
          }}
        />

        <S.TextArea style={{ width: '56px' }} value={row.timer} readOnly />

        <S.TextArea
          value={row.skill}
          style={{
            width: '200px',
            backgroundColor: getMechanicColor(row.mechanicType)
          }}
          readOnly
        />
      </Sticky>

      <Scrolable $damageVisible={skillVisibility.numbers}>
        {skillVisibility.numbers && (
          <>
            <S.TextArea value={row.damagetotal} readOnly />

            <S.TextArea
              value={calculateMitigation(
                Number(row.damagetotal),
                row.type || 'magical',
                row.mechanicType || 'mechanic',
                activeMitigations,
                activeJobs,
                mainTank
              )}
              readOnly
            />

            <S.SelectionOption
              value={row.type}
              onChange={(e) =>
                updateDamageType(
                  safeGroupId,
                  safeFightId,
                  row.id,
                  e.target.value as 'magical' | 'physical'
                )
              }
            >
              <S.OptionSelection value="magical">Magical</S.OptionSelection>
              <S.OptionSelection value="physical">Physical</S.OptionSelection>
            </S.SelectionOption>
          </>
        )}

        {Object.entries(jobSkills).map(([jobName, skills], jobIndex) => {
          if (!activeJobs.includes(jobName)) return null
          if (!visibleJobs.includes(jobName)) return null
          return (
            <S.Job key={jobName} style={{ display: 'flex' }}>
              {skills
                .filter((skill) => {
                  if (
                    skill.type === 'singleMitigation' &&
                    !skillVisibility.singleMitigation
                  ) {
                    return false
                  }

                  if (skill.type === 'healing' && !skillVisibility.healing) {
                    return false
                  }
                  return true
                })
                .map((skill) => {
                  const checkboxKey = `${row.id}|${jobIndex}|${skill.alt}`
                  const isChecked = row.checkbox?.[checkboxKey] || false
                  const colorstate =
                    mitigationStateMap[`${jobName}-${skill.alt}`] ?? 'default'
                  return (
                    <S.CheckboxWrapper
                      key={checkboxKey}
                      $colorstate={colorstate}
                      data-checked={isChecked}
                    >
                      <S.Checkbox
                        id={checkboxKey}
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(checkboxKey, e.target.checked)
                        }
                      />
                    </S.CheckboxWrapper>
                  )
                })}
            </S.Job>
          )
        })}
      </Scrolable>
    </Row>
  )
}

/**
 * React.memo prevents re-rendering this row
 * unless its props actually change.
 *
 * VERY important for tables / spreadsheets.
 */
export default React.memo(DataRow)
