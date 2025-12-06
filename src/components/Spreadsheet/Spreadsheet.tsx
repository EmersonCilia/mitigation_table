import { useState, useEffect, useRef } from 'react'

import { listenForRows, saveRow } from '../../firebase/fights'

import {
  Button,
  ButtonGroup,
  Container,
  HeaderTitle,
  LabelGroups,
  Row,
  Scrolable,
  Table,
  Sticky,
  MarginMobile
} from './Styles'

import Dancer from '../Jobs/Dancer/Dancer'
import DarkKnight from '../Jobs/DarkKnight/DarkKnight'
import Gunbreaker from '../Jobs/Gunbreaker/Gunbreaker'
import Pictomancer from '../Jobs/Pictomancer/Pictomancer'
import Samurai from '../Jobs/Samurai/Samurai'
import Scholar from '../Jobs/Scholar/Scholar'
import Viper from '../Jobs/Viper/Viper'
import WhiteMage from '../Jobs/WhiteMage/WhiteMage'

import DataRow, { RowData } from '../DataRow/DataRow'

const Spreadsheet = () => {
  const [rows, setRows] = useState<RowData[]>([])
  const [timer, setTimer] = useState<number>(0)
  const [skill, setSkill] = useState('')
  const [damageTotal, setDamageTotal] = useState<number>(0)
  const [contentWidth, setContentWidth] = useState<number>(0)

  const fightId = 'your-fight-id-here'

  // Refs for measuring width
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listenForRows(fightId, (rowsFromDB) => {
      setRows(rowsFromDB)
    })
  }, [])

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

  const handleAdd = async () => {
    if (!timer || !skill || !damageTotal) return

    await saveRow(fightId, timer, {
      skill,
      damagetotal: damageTotal,
      damagetaken: 0,
      type: 'magical',
      checkbox: {}
    })

    setTimer(0)
    setSkill('')
    setDamageTotal(0)
  }

  return (
    <Container>
      <Table>
        <Row ref={headerRowRef}>
          <Sticky>
            <MarginMobile />
            <HeaderTitle style={{ width: '40px' }}>timer</HeaderTitle>
            <HeaderTitle>skill</HeaderTitle>
          </Sticky>

          {/* ⭐ this is what we measure */}
          <Scrolable ref={scrollRef} style={{ marginRight: '40px' }}>
            <HeaderTitle>Damage Total</HeaderTitle>
            <HeaderTitle>Damage Taken</HeaderTitle>
            <HeaderTitle>Type</HeaderTitle>
            <Gunbreaker />
            <DarkKnight />
            <Scholar />
            <WhiteMage />
            <Samurai />
            <Viper />
            <Pictomancer />
            <Dancer />
          </Scrolable>
        </Row>

        {rows.map((row) => (
          <DataRow key={row.id} row={row} contentWidth={contentWidth} />
        ))}
      </Table>

      <ButtonGroup>
        <LabelGroups>
          <label>timer</label>
          <input
            type="text"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
          />
        </LabelGroups>

        <LabelGroups>
          <label>skill name</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </LabelGroups>

        <LabelGroups>
          <label>damage total</label>
          <input
            type="text"
            value={damageTotal}
            onChange={(e) => setDamageTotal(Number(e.target.value))}
          />
        </LabelGroups>

        <Button onClick={handleAdd}>Add</Button>
      </ButtonGroup>
    </Container>
  )
}

export default Spreadsheet
