import { Route, Routes } from 'react-router-dom'
import Spreadsheet from './components/Spreadsheet/Spreadsheet'
import Groups from './components/Groups/Groups'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import ProtectedRoute from './components/Routes/ProtectedRoute'

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/:groupId" element={<Groups />} />
      <Route path="/:groupId/:fightId" element={<Spreadsheet />} />
    </Route>
  </Routes>
)

export default Router
