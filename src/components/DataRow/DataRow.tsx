import {
  deleteRow,
  updateCheckbox,
  updateDamageType
} from '../../firebase/fights'
import { jobSkills } from '../Data/JobSkills'
import { Row, Scrolable, Sticky } from '../Spreadsheet/Styles'
import * as S from './styles'
import calculateMitigation from '../../Utils/mitigationCalculator'
import trashCan from '../../assets/trash_can.svg'
import { useParams } from 'react-router-dom'
import { mitigationsData } from '../Data/MitigationData'
import { toSeconds } from '../../Utils/ToSeconds'
import { JSX } from 'react'
import { RowStructure } from '../../Utils/types'
import { resolveMitigationState } from '../../Utils/resolveMitigationActive'

const DataRow = ({
  row,
  contentWidth,
  selectedJobs,
  activations,
  skillVisibility
}: RowStructure): JSX.Element | null => {
  const { groupId, fightId } = useParams<{
    groupId: string
    fightId: string
  }>()
  const timerKey = row.timer.toString()

  if (!groupId || !fightId) return null

  const handleCheckboxChange = async (checkboxKey: string, value: boolean) => {
    await updateCheckbox(groupId, fightId, timerKey, checkboxKey, value)
  }

  // Parse checkbox keys into a structure for mitigation
  // This object will end up looking like:
  // {
  //   "WAR": {
  //      "Vengeance": true,
  //       "Rampart": true
  //  },
  //   "PLD": {
  //       "Sentinel": true
  //   }
  // }
  //
  // Meaning: which mitigations are ACTIVE at this exact row time
  const activeMitigations: Record<string, Record<string, boolean>> = {}

  // Loop through all jobs and their skills
  Object.entries(jobSkills).forEach(([jobName, skills], jobIndex) => {
    if (!selectedJobs.includes(jobName)) return // Skip hidden jobs

    const jobIndexStr = String(jobIndex)

    const currentTime = toSeconds(row.timer) // This is the "current moment" in the fight (e.g. "01:23")

    // Loop through every skill of this job
    skills.forEach((skill) => {
      if (
        skill.type === 'singleMitigation' && // If the category is hidden, skip it
        !skillVisibility.singleMitigation
      )
        return

      if (skill.type === 'healing' && !skillVisibility.healing) return // If the category is hidden, skip it

      // Get all recorded activation times for this skill
      // Example: [30, 120, 210]
      // If none exist, default to an empty array
      const activationTimes = activations?.[jobIndexStr]?.[skill.alt] ?? []

      // Get mitigation metadata from mitigationData
      const mitInfo = mitigationsData[skill.alt as keyof typeof mitigationsData]

      // Determine the current state of this skill at this time
      const colorstate = resolveMitigationState(
        currentTime,
        activationTimes,
        mitInfo?.duration ?? 0,
        mitInfo?.cooldown ?? 0
      )

      // If the mitigation is ACTIVE right now
      if (colorstate === 'green') {
        // Ensure this job exists in the activeMitigations object
        activeMitigations[jobName] ??= {}

        // Mark this specific mitigation as active
        activeMitigations[jobName][skill.alt] = true
      }
    })
  })

  return (
    <Row style={{ width: contentWidth }}>
      <Sticky>
        <S.TrashCan
          style={{
            borderBottom: '1px solid black'
          }}
          src={trashCan}
          alt="trashCan"
          onClick={() => {
            if (window.confirm('Delete this row?')) {
              deleteRow(groupId, fightId, row.timer)
            }
          }}
        />
        <S.TextArea style={{ width: '48px' }} value={row.timer} readOnly />
        <S.TextArea value={row.skill} style={{ width: '120px' }} readOnly />
      </Sticky>

      <Scrolable $damageVisible={skillVisibility.numbers}>
        {skillVisibility.numbers && (
          <>
            <S.TextArea value={row.damagetotal} readOnly />

            <S.TextArea
              value={calculateMitigation(
                Number(row.damagetotal),
                row.type || 'magical',
                activeMitigations,
                selectedJobs
              )}
              readOnly
            />

            <S.SelectionOption
              style={{ width: '80px' }}
              value={row.type}
              onChange={(e) =>
                updateDamageType(
                  groupId,
                  fightId,
                  row.timer,
                  e.target.value as 'magical' | 'physical'
                )
              }
            >
              <S.OptionSelection value="magical">Magical</S.OptionSelection>
              <S.OptionSelection value="physical">Physical</S.OptionSelection>
            </S.SelectionOption>
          </>
        )}

        {/* Only render the jobs selected for this fight */}
        {Object.entries(jobSkills).map(([jobName, skills], jobIndex) => {
          if (!selectedJobs.includes(jobName)) return null // skip hidden jobs

          return (
            <S.Job key={jobName} style={{ display: 'flex' }}>
              {skills
                .filter((skill) => {
                  if (skill.type === 'singleMitigation') {
                    return skillVisibility.singleMitigation
                  }
                  if (skill.type === 'healing') {
                    return skillVisibility.healing
                  }

                  return true
                })
                .map((skill) => {
                  const checkboxKey = `${row.timer}-${jobIndex}-${skill.alt}`
                  const isChecked = row.checkbox?.[checkboxKey] || false
                  const jobIndexStr = String(jobIndex)

                  const activationTimes =
                    activations?.[jobIndexStr]?.[skill.alt] ?? []

                  const mitInfo =
                    mitigationsData[skill.alt as keyof typeof mitigationsData]

                  const colorstate = resolveMitigationState(
                    toSeconds(row.timer),
                    activationTimes,
                    mitInfo?.duration ?? 0,
                    mitInfo?.cooldown ?? 0
                  )
                  if (colorstate === 'green') {
                    activeMitigations[jobName] ??= {}
                    activeMitigations[jobName][skill.alt] = true
                  }

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

export default DataRow
