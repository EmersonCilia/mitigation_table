import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Title } from './styles'
import { getGroup } from '../../firebase/fights'
import { Button } from '../../styles'

const Home = () => {
  const [groupName, setGroupName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')

    const key = groupName.trim().toLowerCase()
    const group = await getGroup(key)

    if (!key || !password.trim()) {
      setError('Fill all fields')
      return
    }
    if (!group) {
      setError('Group not found')
      return
    }
    if (group.password !== password) {
      setError('Invalid password')
      return
    }

    localStorage.setItem(
      'authGroup',
      JSON.stringify({
        name: key,
        loggedAt: Date.now()
      })
    )

    navigate(`/${key}`)
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <Container>
      <Title>FFXIV Mitigation Table</Title>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          flexDirection: 'column'
        }}
      >
        <input
          type="text"
          placeholder="group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ padding: '8px', color: 'black' }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', color: 'black' }}
        />

        {error && <span style={{ color: 'red' }}>{error}</span>}

        <Button onClick={handleLogin} $variant="green">
          Login
        </Button>

        <Button $variant="blue" onClick={goToRegister}>
          Create group
        </Button>
      </div>
    </Container>
  )
}

export default Home
