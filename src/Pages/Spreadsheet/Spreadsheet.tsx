import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  listenForFightConfig,
  listenForRotation,
  listenForRows,
  saveRow,
  updateActiveJobs,
  updateMainTank
} from '../../firebase/fights'

import DataRow from '../../components/DataRow/DataRow'
import Aside from '../../components/Aside/Aside'
import { toSeconds } from '../../Utils/ToSeconds'
import Job from '../../components/Jobs/Job'

import returnButton from '../../assets/return.svg'
import arrow from '../../assets/arrow.svg'
import add from '../../assets/add.svg'

import * as S from './Styles'
import { Button } from '../../styles'
import { allJobs } from '../../components/Data/JobSkills'
import { Action, MechanicType, RowData } from '../../Utils/types'

const Spreadsheet = () => {
  const [rows, setRows] = useState<RowData[]>([])
  const [timer, setTimer] = useState('')
  const [skill, setSkill] = useState('')
  const [damageTotal, setDamageTotal] = useState<number>(0)
  const [activeJobs, setActiveJobs] = useState<string[]>([])
  const isMobile = window.innerWidth <= 480
  const [asideOpen, setAsideOpen] = useState(!isMobile)
  const [mechanicType, setMechanicType] = useState<MechanicType>('mechanic')
  const [dbRotationActions, setDbRotationActions] = useState<Action[]>([])
  const [mainTank, setMainTank] = useState<string | null>(null)
  const [visibleJobs, setVisibleJobs] = useState<string[]>(() => {
    const stored = localStorage.getItem('visibleJobs')
    return stored ? JSON.parse(stored) : []
  })

  const [skillVisibility, setSkillVisibility] = useState(() => {
    const stored = localStorage.getItem('skillVisibility')
    return stored
      ? JSON.parse(stored)
      : {
          singleMitigation: true,
          healing: true,
          numbers: true
        }
  })

  const { groupId, fightId } = useParams()

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribes: (() => void)[] = []

    allJobs.forEach((job) => {
      const unsub = listenForRotation(groupId, fightId, job.job, (actions) => {
        // merge actions from all jobs
        setDbRotationActions((prev) => {
          const otherActions = prev.filter((a) => a.job !== job.job)
          return [...otherActions, ...actions]
        })
      })
      unsubscribes.push(unsub)
    })

    return () => {
      unsubscribes.forEach((unsub) => unsub())
    }
  }, [groupId, fightId])

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForFightConfig(groupId, fightId, (config) => {
      setActiveJobs(config.activeJobs || [])
      setMainTank(config.mainTank || null)
    })

    return unsubscribe
  }, [groupId, fightId])

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForRows(groupId, fightId, (rowsFromDB) => {
      setRows(rowsFromDB)
    })

    return unsubscribe
  }, [groupId, fightId])

  useEffect(() => {
    localStorage.setItem('skillVisibility', JSON.stringify(skillVisibility))
  }, [skillVisibility])

  useEffect(() => {
    localStorage.setItem('visibleJobs', JSON.stringify(visibleJobs))
  }, [visibleJobs])

  const AddRow = async () => {
    if (!groupId || !fightId) return
    if (!timer || !skill) return

    const timerToSave = getSaveFormat(timer)
    const cryptoid = crypto.randomUUID()
    await saveRow(groupId, fightId, cryptoid, {
      timer: timerToSave,
      skill,
      damagetotal: damageTotal || 0,
      type: 'magical',
      mechanicType: mechanicType,
      checkbox: {}
    })
    setTimer('')
    setSkill('')
    setDamageTotal(0)
  }
  const toggleActiveJob = async (jobId: string) => {
    if (!groupId || !fightId) return

    const isActive = activeJobs.includes(jobId)

    const updated = isActive
      ? activeJobs.filter((j) => j !== jobId)
      : [...activeJobs, jobId]

    setActiveJobs(updated)

    if (!isActive) {
      setVisibleJobs((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]))
    }

    if (mainTank === jobId && !updated.includes(jobId)) {
      setMainTank(null)
      await updateMainTank(groupId, fightId, null)
    }

    await updateActiveJobs(groupId, fightId, updated)
  }
  const toggleMainTank = async (jobId: string) => {
    if (!groupId || !fightId) return

    // only tanks allowed
    const job = allJobs.find((j) => j.job === jobId)
    if (job?.role !== 'tank') return

    const newMainTank = mainTank === jobId ? null : jobId

    setMainTank(newMainTank)

    await updateMainTank(groupId, fightId, newMainTank)
  }

  // timer input mask
  // Keep the display
  const handleTimer = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)

    let minutes = ''
    let seconds = ''

    if (digits.length === 0) {
      minutes = ''
      seconds = ''
    } else if (digits.length <= 2) {
      minutes = ''
      seconds = digits
    } else {
      minutes = digits.slice(0, digits.length - 2)
      seconds = digits.slice(-2)
    }

    const formatted =
      (minutes ? minutes : '__') + ':' + (seconds ? seconds : '__')
    setTimer(formatted)
  }

  // When saving
  const getSaveFormat = (timer: string) => {
    const [m, s] = timer.split(':')
    const minutes = m === '' || m === '__' ? '00' : m.padStart(2, '0')
    const seconds = s === '' || s === '__' ? '00' : s.padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  /**
   * Activations shape:
   * {
   *   "<jobIndex>": {
   *     "<mitName>": [timeInSeconds, timeInSeconds, ...]
   *   },
   *   ...
   * }
   */
  const buildActivations = (rows: RowData[], rotation: Action[]) => {
    const activations: Record<string, Record<string, number[]>> = {}

    // Add checked boxes first (existing logic)
    rows.forEach((r) => {
      Object.entries(r.checkbox || {}).forEach(([key, checked]) => {
        if (!checked) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [rowId, jobIndex, mitName] = key.split('|')
        activations[jobIndex] ??= {}
        activations[jobIndex][mitName] ??= []
        activations[jobIndex][mitName].push(toSeconds(r.timer))
      })
    })
    // Merge in rotation actions automatically
    rotation.forEach((action) => {
      // Match action name → mitigation skill alt
      const mitName = action.name // you can map this if different
      const jobIndex = String(
        allJobs.findIndex(
          (j) => j.job.toLowerCase() === action.job?.toLowerCase()
        )
      )
      if (!jobIndex) return
      activations[jobIndex] ??= {}
      activations[jobIndex][mitName] ??= []
      activations[jobIndex][mitName].push(action.start)
    })

    // Sort each array
    Object.values(activations).forEach((byJob) => {
      Object.values(byJob).forEach((arr) => arr.sort((a, b) => a - b))
    })
    return activations
  }

  const activations = buildActivations(rows, dbRotationActions)
  if (!groupId || !fightId) {
    return <div>Invalid fight</div>
  }

  return (
    <S.SpreadSheet>
      <S.MobileHamburger
        open={asideOpen}
        onClick={() => setAsideOpen((prev) => !prev)}
      >
        <img src={arrow} alt="open menu" />
      </S.MobileHamburger>
      <S.AsideButton
        open={asideOpen}
        onClick={() => setAsideOpen((prev) => !prev)}
      >
        <img src={arrow} alt="toggle sidebar" />
      </S.AsideButton>
      <S.AsideContainer open={asideOpen}>
        <S.AsidePanel open={asideOpen}>
          <Aside
            jobs={allJobs}
            activeJobs={activeJobs}
            toggleJob={toggleActiveJob}
            toggleMt={toggleMainTank}
            skillVisibility={skillVisibility}
            setSkillVisibility={setSkillVisibility}
            visibleJobs={visibleJobs}
            setVisibleJobs={setVisibleJobs}
          />
        </S.AsidePanel>
      </S.AsideContainer>

      <S.Container open={asideOpen}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{fightId}</h1>
        <S.Table>
          <S.TableHeader>
            <S.Sticky>
              <S.HeaderTitle
                style={{
                  width: '20px',
                  borderBottom: '1px solid black'
                }}
              />
              <S.HeaderTitle style={{ width: '56px' }}>timer</S.HeaderTitle>
              <S.HeaderTitle style={{ width: '200px' }}>skill</S.HeaderTitle>
            </S.Sticky>
            <S.Scrolable $damageVisible={skillVisibility.numbers}>
              {skillVisibility.numbers && (
                <>
                  <S.HeaderTitle>Damage Total</S.HeaderTitle>
                  <S.HeaderTitle>Damage Taken</S.HeaderTitle>
                  <S.HeaderTitle style={{ width: '100px' }}>Type</S.HeaderTitle>
                </>
              )}
              {allJobs
                .filter((j) => activeJobs.includes(j.job))
                .map((job) => (
                  <Link
                    key={job.id}
                    to={`/${groupId}/${fightId}/${job.job}`}
                    style={{ width: '100%', textDecoration: 'none' }}
                  >
                    <Job
                      job={job.job}
                      skillVisibility={skillVisibility}
                      visibleJobs={visibleJobs}
                    />
                  </Link>
                ))}
            </S.Scrolable>
          </S.TableHeader>

          {rows.map((row) => (
            <DataRow
              key={row.id}
              row={row}
              rows={rows}
              activeJobs={activeJobs}
              activations={activations}
              skillVisibility={skillVisibility}
              visibleJobs={visibleJobs}
              mainTank={mainTank}
            />
          ))}
        </S.Table>

        <S.ButtonGroup>
          <S.ButtonLink to={`/${groupId}`}>
            <Button $variant="red">
              <img src={returnButton} alt="Back to fights" />
            </Button>
          </S.ButtonLink>
          <S.InputGroups>
            <S.LabelGroups>
              <label htmlFor="timer">timer</label>
              <input
                style={{ maxWidth: '50px' }}
                id="timer"
                name="timer"
                type="text"
                value={timer}
                onChange={(e) => handleTimer(e.target.value)}
              />
            </S.LabelGroups>

            <S.LabelGroups>
              <label htmlFor="skillName">skill name</label>
              <input
                style={{ maxWidth: '150px' }}
                id="skillName"
                name="skillName"
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </S.LabelGroups>

            {skillVisibility.numbers && (
              <>
                <S.LabelGroups>
                  <label htmlFor="damageTotal">damage total</label>
                  <input
                    style={{ maxWidth: '70px' }}
                    id="damageTotal"
                    name="damageTotal"
                    type="text"
                    value={damageTotal || ''}
                    onChange={(e) => setDamageTotal(Number(e.target.value))}
                  />
                </S.LabelGroups>
                <S.LabelGroups>
                  <label htmlFor="mechanicType">type</label>
                  <select
                    id="mechanicType"
                    name="mechanicType"
                    value={mechanicType}
                    onChange={(e) =>
                      setMechanicType(e.target.value as MechanicType)
                    }
                  >
                    <option value="raidwide">raidwide</option>
                    <option value="debuff">debuff</option>
                    <option value="tankbusterMT">mt tankbuster</option>
                    <option value="tankbusterOT">ot tankbuster</option>
                    <option value="mechanic">mechanic</option>
                  </select>
                </S.LabelGroups>
              </>
            )}

            <Button
              $variant="green"
              onClick={AddRow}
              style={{
                height: '40px',
                width: '40px',
                padding: '0',
                alignSelf: 'end'
              }}
            >
              <img src={add} alt="Add row" />
            </Button>
          </S.InputGroups>
        </S.ButtonGroup>
      </S.Container>
    </S.SpreadSheet>
  )
}

export default Spreadsheet
