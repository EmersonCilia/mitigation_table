import { updateCheckbox } from '../../firebase/fights'
import { jobSkills } from '../Data/JobSkills'
import { Row, Scrolable, Sticky } from '../Spreadsheet/Styles'
import { Checkbox, Job, TextArea } from './styles'
import calculateMitigation from '../utils/mitigationCalculator'

// types.ts
export type RowData = {
  id: string
  timer: number
  skill: string
  damagetotal: string
  type: 'magical' | 'physical'
  checkbox?: Record<string, boolean>
}

const DataRow = ({
  row,
  contentWidth
}: {
  row: RowData
  contentWidth: number
}) => {
  const fightId = 'your-fight-id-here'
  const timerKey = row.timer.toString()

  const handleCheckboxChange = async (checkboxKey: string, value: boolean) => {
    await updateCheckbox(fightId, timerKey, checkboxKey, value)
  }

  // Example: row.checkbox = { "0-0-Reprisal": true, "0-1-Rampart": false, ... }
  const playerMitigations: Record<string, Record<string, boolean>> = {}

  // You can define jobs and match them with checkbox keys
  const jobs = ['GNB', 'DRK', 'SCH', 'WHM', 'VPR', 'SAM', 'PCM', 'DNC']

  Object.entries(row.checkbox || {}).forEach(([key, value]) => {
    // key = `${timer}-${jobIndex}-${mitName}`
    const parts = key.split('-')
    const jobIndex = Number(parts[1])
    const mitName = parts[2] // the mitigation name
    const playerName = jobs[jobIndex] || `Player${jobIndex}` // map jobIndex to player

    if (!playerMitigations[playerName]) playerMitigations[playerName] = {}
    playerMitigations[playerName][mitName] = value
  })

  return (
    <Row style={{ width: contentWidth }}>
      <Sticky>
        <TextArea style={{ width: '40px' }} value={row.timer} readOnly />
        <TextArea value={row.skill} readOnly />
      </Sticky>

      <Scrolable>
        <TextArea value={row.damagetotal} readOnly />

        <TextArea
          value={calculateMitigation(
            Number(row.damagetotal),
            row.type,
            playerMitigations
          )}
          readOnly
        />
        <select style={{ width: '120px' }}>
          <option value="magical">Magical</option>
          <option value="physical">Physical</option>
        </select>

        {Object.values(jobSkills).map((skills, jobIndex) => (
          <Job key={jobIndex} style={{ display: 'flex' }}>
            {skills.map((skill) => {
              const checkboxKey = `${row.timer}-${jobIndex}-${skill.alt}`

              return (
                <Checkbox
                  key={checkboxKey}
                  id={checkboxKey}
                  type="checkbox"
                  checked={row.checkbox?.[checkboxKey] || false}
                  onChange={(e) =>
                    handleCheckboxChange(checkboxKey, e.target.checked)
                  }
                />
              )
            })}
          </Job>
        ))}
      </Scrolable>
    </Row>
  )
}

export default DataRow
