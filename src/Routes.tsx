import { Route, Routes } from 'react-router-dom'
import Spreadsheet from './components/Spreadsheet/Spreadsheet'

const Router = () => (
  <Routes>
    <Route path="/" element={<Spreadsheet />} />
  </Routes>
)

export default Router
