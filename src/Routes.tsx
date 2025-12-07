import { Route, Routes } from 'react-router-dom'
import Spreadsheet from './components/Spreadsheet/Spreadsheet'
import Home from './components/Home/Home'

const Router = () => (
  <Routes>
    <Route path="/fight/:name" element={<Spreadsheet />} />
    <Route path="/" element={<Home />} />
  </Routes>
)

export default Router
