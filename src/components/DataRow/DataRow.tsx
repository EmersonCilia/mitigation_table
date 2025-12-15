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

  const jobs = Object.keys(jobSkills)

  // Parse checkbox keys into a structure for mitigation
  const playerMitigations: Record<string, Record<string, boolean>> = {}

  Object.entries(row.checkbox || {}).forEach(([key, value]) => {
    const parts = key.split('-')
    const jobIndex = Number(parts[1])
    const mitName = parts[2]
    const playerName = jobs[jobIndex] || `Player${jobIndex}`

    if (!playerMitigations[playerName]) playerMitigations[playerName] = {}
    playerMitigations[playerName][mitName] = value
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

      <Scrolable>
        <S.TextArea value={row.damagetotal} readOnly />

        <S.TextArea
          value={calculateMitigation(
            Number(row.damagetotal),
            row.type || 'magical',
            playerMitigations,
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

        {/* Only render the jobs selected for this fight */}
        {Object.entries(jobSkills).map(([jobName, skills], jobIndex) => {
          if (!selectedJobs.includes(jobName)) return null // skip hidden jobs

          return (
            <S.Job key={jobName} style={{ display: 'flex' }}>
              {skills
                .filter((skill) => {
                  if (skill.type === 'singleMitigation')
                    return skillVisibility.singleMitigation

                  if (skill.type === 'healing') return skillVisibility.healing

                  return true
                })
                .map((skill) => {
                  const checkboxKey = `${row.timer}-${jobIndex}-${skill.alt}`
                  const isChecked = row.checkbox?.[checkboxKey] || false

                  const currentTime = toSeconds(row.timer)

                  const jobIndexStr = String(jobIndex)
                  const activationTimes =
                    activations?.[jobIndexStr]?.[skill.alt] ?? []

                  let activationTime: number | null = null
                  for (let i = activationTimes.length - 1; i >= 0; i--) {
                    if (activationTimes[i] <= currentTime) {
                      activationTime = activationTimes[i]
                      break
                    }
                  }

                  const mitInfo =
                    mitigationsData[skill.alt as keyof typeof mitigationsData]
                  const duration = mitInfo?.duration ?? 0
                  const cooldown = mitInfo?.cooldown ?? 0

                  let colorstate: 'default' | 'green' | 'red' = 'default'

                  if (activationTime !== null) {
                    const timeDiff = currentTime - activationTime
                    if (timeDiff <= duration) colorstate = 'green'
                    else if (timeDiff <= cooldown) colorstate = 'red'
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
