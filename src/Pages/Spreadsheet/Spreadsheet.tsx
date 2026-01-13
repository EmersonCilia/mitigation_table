import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import {
  listenForActiveJobs,
  listenForRows,
  saveRow,
  updateActiveJobs
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
import { RowData } from '../../Utils/types'

const Spreadsheet = () => {
  const [rows, setRows] = useState<RowData[]>([])
  const [timer, setTimer] = useState('')
  const [skill, setSkill] = useState('')
  const [damageTotal, setDamageTotal] = useState<number>(0)
  const [contentWidth, setContentWidth] = useState<number>(0)
  const [activeJobs, setActiveJobs] = useState<string[]>([])
  const isMobile = window.innerWidth <= 480
  const [asideOpen, setAsideOpen] = useState(!isMobile)

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
  useEffect(() => {
    localStorage.setItem('skillVisibility', JSON.stringify(skillVisibility))
  }, [skillVisibility])

  const { groupId, fightId } = useParams<{
    groupId: string
    fightId: string
  }>()

  // Refs for measuring width
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForActiveJobs(groupId, fightId, (jobsFromDB) => {
      setActiveJobs(jobsFromDB || [])
    })

    return unsubscribe
  }, [groupId, fightId])

  useEffect(() => {
    const updateWidth = () => {
      if (!scrollRef.current) return
      const w = scrollRef.current.scrollWidth
      setContentWidth(w)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [rows])

  // EFFECT: Sync row width to scrollable content width
  useEffect(() => {
    const updateWidth = () => {
      if (!scrollRef.current || !headerRowRef.current) return
      const fullWidth = scrollRef.current.scrollWidth
      headerRowRef.current.style.width = fullWidth + 'px'
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [rows])

  useEffect(() => {
    if (!groupId || !fightId) return

    const unsubscribe = listenForRows(groupId, fightId, (rowsFromDB) => {
      setRows(rowsFromDB)
    })

    return unsubscribe
  }, [groupId, fightId])

  const AddRow = async () => {
    if (!groupId || !fightId) return
    if (!timer || !skill) return

    const timerToSave = getSaveFormat(timer)

    await saveRow(groupId, fightId, timerToSave, {
      skill,
      damagetotal: damageTotal || 0,
      type: 'magical',
      checkbox: {}
    })

    setTimer('')
    setSkill('')
    setDamageTotal(0)
  }

  const toggleJob = async (jobId: string) => {
    if (!groupId || !fightId) return

    const updated = activeJobs.includes(jobId)
      ? activeJobs.filter((j) => j !== jobId)
      : [...activeJobs, jobId]

    setActiveJobs(updated)
    await updateActiveJobs(groupId, fightId, updated)
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
  const buildActivations = (rows: RowData[]) => {
    const activations: Record<string, Record<string, number[]>> = {}

    rows.forEach((r) => {
      Object.entries(r.checkbox || {}).forEach(([key, checked]) => {
        if (!checked) return
        // key format: `${timer}-${jobIndex}-${mitName}`
        const parts = key.split('-')
        const timer = parts[0]
        const jobIndex = parts[1] // keep as string for lookup
        const mitName = parts.slice(2).join('-') // in case mitName contains dashes

        if (!activations[jobIndex]) activations[jobIndex] = {}
        if (!activations[jobIndex][mitName]) activations[jobIndex][mitName] = []

        activations[jobIndex][mitName].push(toSeconds(timer))
      })
    })

    // sort each array ascending (so we can binary-search or reverse-iterate)
    Object.values(activations).forEach((byJob) => {
      Object.values(byJob).forEach((arr) => arr.sort((a, b) => a - b))
    })

    return activations
  }

  const activations = buildActivations(rows)
  if (!groupId || !fightId) {
    console.log(groupId, fightId)
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
      <S.AsideContainer>
        <S.AsidePanel open={asideOpen}>
          <Aside
            jobs={allJobs}
            activeJobs={activeJobs}
            toggleJob={toggleJob}
            skillVisibility={skillVisibility}
            setSkillVisibility={setSkillVisibility}
          />
        </S.AsidePanel>

        <S.AsideButton
          open={asideOpen}
          onClick={() => setAsideOpen((prev) => !prev)}
        >
          <img src={arrow} alt="toggle sidebar" />
        </S.AsideButton>
      </S.AsideContainer>

      <S.Container open={asideOpen}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{fightId}</h1>
        <S.Table>
          <S.Row ref={headerRowRef}>
            <S.Sticky>
              <S.HeaderTitle
                style={{
                  width: '20px',
                  borderBottom: '1px solid black'
                }}
              />
              <S.HeaderTitle style={{ width: '48px' }}>timer</S.HeaderTitle>
              <S.HeaderTitle style={{ width: '120px' }}>skill</S.HeaderTitle>
            </S.Sticky>
            <S.Scrolable
              ref={scrollRef}
              $damageVisible={skillVisibility.numbers}
              style={{ marginRight: '40px' }}
            >
              {skillVisibility.numbers && (
                <>
                  <S.HeaderTitle>Damage Total</S.HeaderTitle>
                  <S.HeaderTitle>Damage Taken</S.HeaderTitle>
                  <S.HeaderTitle style={{ width: '80px' }}>Type</S.HeaderTitle>
                </>
              )}
              {allJobs
                .filter((j) => activeJobs.includes(j.job))
                .map((job) => (
                  <Job
                    key={job.id}
                    job={job.job}
                    skillVisibility={skillVisibility}
                  />
                ))}
            </S.Scrolable>
          </S.Row>

          {rows.map((row) => (
            <DataRow
              key={row.id}
              row={row}
              contentWidth={contentWidth}
              selectedJobs={activeJobs}
              activations={activations}
              skillVisibility={skillVisibility}
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
                style={{ maxWidth: '50px', color: 'black' }}
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
                style={{ maxWidth: '150px', color: 'black' }}
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
                    style={{ maxWidth: '70px', color: 'black' }}
                    id="damageTotal"
                    name="damageTotal"
                    type="text"
                    value={damageTotal || ''}
                    onChange={(e) => setDamageTotal(Number(e.target.value))}
                  />
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
