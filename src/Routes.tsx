import { Route, Routes } from 'react-router-dom'
import Spreadsheet from './Pages/Spreadsheet/Spreadsheet'
import Groups from './Pages/Groups/Groups'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import ProtectedRoute from './components/Routes/ProtectedRoute'
import RotationTimeline from './Pages/RotationPlainer/BlackMage/RotationTimeline'

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/:groupId" element={<Groups />} />
      <Route path="/:groupId/:fightId" element={<Spreadsheet />} />
      <Route path="/:groupId/:fightId/:jobId" element={<RotationTimeline />} />
    </Route>
  </Routes>
)

export default Router
