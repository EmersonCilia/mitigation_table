import { Navigate, Outlet, useParams } from 'react-router-dom'

const SESSION_DURATION = 1000 * 60 * 60 * 8 // 8 hours

const ProtectedRoute = () => {
  const { groupId } = useParams()
  const auth = localStorage.getItem('authGroup')

  if (!auth || !groupId) {
    return <Navigate to="/" replace />
  }

  try {
    const parsed = JSON.parse(auth)

    const isExpired = Date.now() - parsed.loggedAt > SESSION_DURATION

    if (isExpired) {
      localStorage.removeItem('authGroup')
      return <Navigate to="/" replace />
    }

    if (parsed.name !== groupId) {
      return <Navigate to="/" replace />
    }
  } catch {
    localStorage.removeItem('authGroup')
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
