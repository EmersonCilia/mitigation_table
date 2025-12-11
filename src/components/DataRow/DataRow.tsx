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

// types.ts
export type RowData = {
  id: string
  timer: string
  skill: string
  damagetotal: string
  type: 'magical' | 'physical'
  checkbox?: Record<string, boolean>
}

const DataRow = ({
  row,
  contentWidth,
  selectedJobs
}: {
  row: RowData
  contentWidth: number
  selectedJobs: string[]
}) => {
  const { name: fightId } = useParams()
  const timerKey = row.timer.toString()

  const handleCheckboxChange = async (checkboxKey: string, value: boolean) => {
    await updateCheckbox(fightId, timerKey, checkboxKey, value)
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
          src={trashCan}
          alt="trashCan"
          onClick={() => {
            if (window.confirm('Delete this row?')) {
              deleteRow(fightId, row.timer)
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
            updateDamageType(fightId, row.timer, e.target.value as any)
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

                return (
                  <CheckboxWrapper
                    key={checkboxKey}
                    active={row.checkbox?.[checkboxKey] || false}
                  >
                    <Checkbox
                      key={checkboxKey}
                      id={checkboxKey}
                      type="checkbox"
                      checked={row.checkbox?.[checkboxKey] || false}
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
