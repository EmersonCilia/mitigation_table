import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import {
  listenForActiveJobs,
  listenForRows,
  saveRow,
  updateActiveJobs
} from '../../firebase/fights'

import * as S from './Styles'

import Dancer from '../Jobs/Dancer/Dancer'
import DarkKnight from '../Jobs/DarkKnight/DarkKnight'
import Gunbreaker from '../Jobs/Gunbreaker/Gunbreaker'
import Pictomancer from '../Jobs/Pictomancer/Pictomancer'
import Samurai from '../Jobs/Samurai/Samurai'
import Scholar from '../Jobs/Scholar/Scholar'
import Viper from '../Jobs/Viper/Viper'
import WhiteMage from '../Jobs/WhiteMage/WhiteMage'
import Warrior from '../Jobs/Warrior/Warrior'
import Sage from '../Jobs/Sage/Sage'
import Astrologian from '../Jobs/Astrologian/Astrologian'
import Paladin from '../Jobs/Paladin/Paladin'

import DataRow, { RowData } from '../DataRow/DataRow'
import Aside from '../Aside/Aside'

const Spreadsheet = () => {
  const [rows, setRows] = useState<RowData[]>([])
  const [timer, setTimer] = useState('')
  const [skill, setSkill] = useState('')
  const [damageTotal, setDamageTotal] = useState<number>(0)
  const [contentWidth, setContentWidth] = useState<number>(0)
  const [activeJobs, setActiveJobs] = useState<string[]>([])
  const [asideOpen, setAsideOpen] = useState(true)

  const allJobs = [
    { id: '0', job: 'GNB', component: Gunbreaker },
    { id: '1', job: 'DRK', component: DarkKnight },
    { id: '2', job: 'PLD', component: Paladin },
    { id: '3', job: 'WAR', component: Warrior },
    { id: '4', job: 'SGE', component: Sage },
    { id: '5', job: 'SCH', component: Scholar },
    { id: '6', job: 'AST', component: Astrologian },
    { id: '7', job: 'WHM', component: WhiteMage },
    { id: '8', job: 'SAM', component: Samurai },
    { id: '9', job: 'VPR', component: Viper },
    { id: '10', job: 'PCM', component: Pictomancer },
    { id: '11', job: 'DNC', component: Dancer }
  ]

  const { name: fightId } = useParams()

  // Refs for measuring width
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listenForActiveJobs(fightId, (jobsFromDB) => {
      setActiveJobs(jobsFromDB || [])
    })
  }, [fightId])

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
    listenForRows(fightId, (rowsFromDB) => {
      setRows(rowsFromDB)
    })
  }, [fightId])

  const AddRow = async () => {
    if (!timer || !skill || !damageTotal) return

    await saveRow(fightId, timer, {
      skill,
      damagetotal: damageTotal,
      type: 'magical',
      checkbox: {}
    })

    setTimer('')
    setSkill('')
    setDamageTotal(0)
  }

  const toggleJob = async (jobId: string) => {
    let updated

    if (activeJobs.includes(jobId)) {
      updated = activeJobs.filter((j) => j !== jobId)
    } else {
      updated = [...activeJobs, jobId]
    }

    setActiveJobs(updated)

    await updateActiveJobs(fightId, updated)
  }

  return (
    <S.SpreadSheet>
      <S.AsideContainer open={asideOpen}>
        <S.AsideDiv open={asideOpen}>
          <Aside jobs={allJobs} activeJobs={activeJobs} toggleJob={toggleJob} />
        </S.AsideDiv>

        <S.AsideButton
          open={asideOpen}
          onClick={() => setAsideOpen((prev) => !prev)}
        >
          {asideOpen ? 'Close Jobs' : 'Open Jobs'}
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
                  backgroundColor: 'white',
                  border: 'none'
                }}
              />
              <S.HeaderTitle style={{ width: '48px' }}>timer</S.HeaderTitle>
              <S.HeaderTitle style={{ width: '120px' }}>skill</S.HeaderTitle>
            </S.Sticky>
            <S.Scrolable ref={scrollRef} style={{ marginRight: '40px' }}>
              <S.HeaderTitle>Damage Total</S.HeaderTitle>
              <S.HeaderTitle>Damage Taken</S.HeaderTitle>
              <S.HeaderTitle style={{ width: '80px' }}>Type</S.HeaderTitle>
              {allJobs
                .filter((j) => activeJobs.includes(j.job))
                .map((job) => {
                  const Component = job.component
                  return <Component key={job.id} />
                })}
            </S.Scrolable>
          </S.Row>

          {rows.map((row) => (
            <DataRow
              key={row.id}
              row={row}
              contentWidth={contentWidth}
              selectedJobs={activeJobs}
            />
          ))}
        </S.Table>

        <S.ButtonGroup>
          <Link to="/">
            <S.Button style={{ marginRight: '20px', height: '40px' }}>
              Back to Home
            </S.Button>
          </Link>
          <S.LabelGroups>
            <label htmlFor="timer">timer</label>
            <input
              id="timer"
              name="timer"
              type="text"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
            />
          </S.LabelGroups>

          <S.LabelGroups>
            <label htmlFor="skillName">skill name</label>
            <input
              id="skillName"
              name="skillName"
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </S.LabelGroups>

          <S.LabelGroups>
            <label htmlFor="damageTotal">damage total</label>
            <input
              id="damageTotal"
              name="damageTotal"
              type="text"
              value={damageTotal}
              onChange={(e) => setDamageTotal(Number(e.target.value))}
            />
          </S.LabelGroups>

          <S.Button onClick={AddRow}>Add</S.Button>
        </S.ButtonGroup>
      </S.Container>
    </S.SpreadSheet>
  )
}

export default Spreadsheet
