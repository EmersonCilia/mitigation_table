import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DataRow, { RowData } from '../DataRow/DataRow'

import Aside from '../Aside/Aside'
import returnButton from '../../assets/return.svg'

import {
  listenForActiveJobs,
  listenForRows,
  saveRow,
  updateActiveJobs
} from '../../firebase/fights'
import arrow from '../../assets/arrow.svg'
import add from '../../assets/add.svg'

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
import Monk from '../Jobs/Monk/Monk'
import Ninja from '../Jobs/Ninja/Ninja'
import Dragoon from '../Jobs/Dragoon/Dragon'
import Reaper from '../Jobs/Reaper/Reaper'
import Machinist from '../Jobs/Machinist/Machinist'
import Bard from '../Jobs/Bard/Bard'
import BlackMage from '../Jobs/BlackMage/BlackMage'
import Summoner from '../Jobs/Summoner/Summoner'
import RedMage from '../Jobs/RedMage/RedMage'

const Spreadsheet = () => {
  const [rows, setRows] = useState<RowData[]>([])
  const [timer, setTimer] = useState('')
  const [skill, setSkill] = useState('')
  const [damageTotal, setDamageTotal] = useState<number>(0)
  const [contentWidth, setContentWidth] = useState<number>(0)
  const [activeJobs, setActiveJobs] = useState<string[]>([])
  const isMobile = window.innerWidth <= 480
  const [asideOpen, setAsideOpen] = useState(!isMobile)

  const allJobs = [
    { id: '0', job: 'GNB', component: Gunbreaker },
    { id: '1', job: 'DRK', component: DarkKnight },
    { id: '2', job: 'PLD', component: Paladin },
    { id: '3', job: 'WAR', component: Warrior },
    { id: '4', job: 'SGE', component: Sage },
    { id: '5', job: 'SCH', component: Scholar },
    { id: '6', job: 'AST', component: Astrologian },
    { id: '7', job: 'WHM', component: WhiteMage },
    { id: '8', job: 'VPR', component: Viper },
    { id: '9', job: 'SAM', component: Samurai },
    { id: '10', job: 'NIN', component: Ninja },
    { id: '11', job: 'DRG', component: Dragoon },
    { id: '12', job: 'RPR', component: Reaper },
    { id: '13', job: 'MNK', component: Monk },
    { id: '14', job: 'PCM', component: Pictomancer },
    { id: '15', job: 'BLM', component: BlackMage },
    { id: '16', job: 'SMN', component: Summoner },
    { id: '17', job: 'RDM', component: RedMage },
    { id: '18', job: 'DNC', component: Dancer },
    { id: '19', job: 'BRD', component: Bard },
    { id: '20', job: 'MCH', component: Machinist }
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

  const handleTimer = (value: string) => {
    let v = value.replace(/\D/g, '').slice(0, 4)

    if (v.length >= 3) {
      v = v.slice(0, 2) + ':' + v.slice(2)
    }

    setTimer(v)
  }

  return (
    <S.SpreadSheet>
      <S.MobileHamburger
        open={asideOpen}
        onClick={() => setAsideOpen((prev) => !prev)}
      >
        <img src={arrow} alt="open menu" />
      </S.MobileHamburger>
      <S.AsideContainer open={asideOpen}>
        <S.AsideDiv open={asideOpen}>
          <Aside jobs={allJobs} activeJobs={activeJobs} toggleJob={toggleJob} />
        </S.AsideDiv>

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
            <S.Button
              style={{
                height: '40px',
                backgroundColor: '#ff5555',
                border: '1px solid black',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <img src={returnButton} alt="Back to home" />
            </S.Button>
          </Link>
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

            <S.LabelGroups>
              <label htmlFor="damageTotal">damage total</label>
              <input
                style={{ maxWidth: '70px', color: 'black' }}
                id="damageTotal"
                name="damageTotal"
                type="text"
                value={damageTotal}
                onChange={(e) => setDamageTotal(Number(e.target.value))}
              />
            </S.LabelGroups>

            <S.Button
              onClick={AddRow}
              style={{
                height: '32px',
                width: '32px',
                backgroundColor: '#50fa7b',
                border: '1px solid black',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <img src={add} alt="Back to home" />
            </S.Button>
          </S.InputGroups>
        </S.ButtonGroup>
      </S.Container>
    </S.SpreadSheet>
  )
}

export default Spreadsheet
