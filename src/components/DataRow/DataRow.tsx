import {
  deleteRow,
  updateCheckbox,
  updateDamageType
} from '../../firebase/fights'
import { jobSkills } from '../Data/JobSkills'
import { Row, Scrolable, Sticky } from '../Spreadsheet/Styles'
import {
  Checkbox,
  CheckboxWrapper,
  Job,
  OptionSelection,
  SelectionOption,
  TextArea,
  TrashCan
} from './styles'
import calculateMitigation from '../../Utils/mitigationCalculator'
import trashCan from '../../assets/trash_can.svg'
import { useParams } from 'react-router-dom'
import { mitigationsData } from '../Data/MitigationData'
import { toSeconds } from '../../Utils/ToSeconds'
import { JSX } from 'react'

// types.ts
export type RowData = {
  id: string
  timer: string
  skill: string
  damagetotal: string
  type: 'magical' | 'physical'
  checkbox?: Record<string, boolean>
}

type Props = {
  row: RowData
  contentWidth: number
  selectedJobs: string[]
  activations: Record<string, Record<string, number[]>>
}

const DataRow = ({
  row,
  contentWidth,
  selectedJobs,
  activations
}: Props): JSX.Element | null => {
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
        <TrashCan
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
        <TextArea style={{ width: '48px' }} value={row.timer} readOnly />
        <TextArea value={row.skill} style={{ width: '120px' }} readOnly />
      </Sticky>

      <Scrolable>
        <TextArea value={row.damagetotal} readOnly />

        <TextArea
          value={calculateMitigation(
            Number(row.damagetotal),
            row.type || 'magical',
            playerMitigations,
            selectedJobs
          )}
          readOnly
        />

        <SelectionOption
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
          <OptionSelection value="magical">Magical</OptionSelection>
          <OptionSelection value="physical">Physical</OptionSelection>
        </SelectionOption>

        {/* Only render the jobs selected for this fight */}
        {Object.entries(jobSkills).map(([jobName, skills], jobIndex) => {
          if (!selectedJobs.includes(jobName)) return null // skip hidden jobs

          return (
            <Job key={jobName} style={{ display: 'flex' }}>
              {skills.map((skill) => {
                const checkboxKey = `${row.timer}-${jobIndex}-${skill.alt}`
                const isChecked = row.checkbox?.[checkboxKey] || false

                const currentTime = toSeconds(row.timer)

                // Look up all activation times for this jobIndex and mitigation name
                const jobIndexStr = String(jobIndex)
                const activationTimes =
                  activations?.[jobIndexStr]?.[skill.alt] ?? []

                // find the most recent activation that is <= currentTime
                let activationTime: number | null = null
                for (let i = activationTimes.length - 1; i >= 0; i--) {
                  if (activationTimes[i] <= currentTime) {
                    activationTime = activationTimes[i]
                    break
                  }
                }

                // Get mitigation info
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
                  <CheckboxWrapper
                    key={checkboxKey}
                    colorstate={colorstate}
                    data-checked={isChecked}
                  >
                    <Checkbox
                      id={checkboxKey}
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(checkboxKey, e.target.checked)
                      }
                    />
                  </CheckboxWrapper>
                )
              })}
            </Job>
          )
        })}
      </Scrolable>
    </Row>
  )
}

export default DataRow
