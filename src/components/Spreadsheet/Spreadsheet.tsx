import { useState, useEffect } from 'react'

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
  Sticky
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

  const fightId = 'your-fight-id-here' // you will replace this later

  useEffect(() => {
    listenForRows(fightId, (rowsFromDB) => {
      setRows(rowsFromDB)
    })

    return () => {
      // optional cleanup
    }
  }, [])

  // in your Spreadsheet component

  const handleAdd = async () => {
    if (!timer || !skill || !damageTotal) return

    // push to firebase, uses timerSeconds internally
    await saveRow(fightId, timer, {
      skill,
      damagetotal: damageTotal,
      damagetaken: 0,
      type: 'magical',
      checkbox: {}
    })

    // local state will update automatically if you use listenForRowsSortedByTimer
    setTimer(0)
    setSkill('')
    setDamageTotal(0)
  }

  return (
    <Container>
      <Table>
        <Row>
          <Sticky>
            <HeaderTitle>timer</HeaderTitle>
            <HeaderTitle>skill</HeaderTitle>
          </Sticky>
          <Scrolable>
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
          <DataRow key={row.id} row={row} />
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
