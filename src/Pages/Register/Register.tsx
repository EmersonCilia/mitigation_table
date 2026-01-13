import { useState } from 'react'
import { ButtonGroup, Container, Title } from './styles'
import { createGroup } from '../../Firebase/fights'
import { Button } from '../../styles'
import { useNavigate } from 'react-router-dom'
import returnButton from '../../assets/return.svg'

const Register = () => {
  const [groupName, setGroupName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !password.trim()) return

    try {
      await createGroup(groupName.trim(), password)
      setGroupName('')
      setPassword('')
      alert('Group created!')
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <Container>
      <Title>Group Register</Title>

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
          placeholder="New group name..."
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

        <ButtonGroup>
          <Button
            $variant="red"
            onClick={() => {
              navigate('/', { replace: true })
            }}
          >
            <img src={returnButton} alt="Return Home" />
          </Button>
          <Button
            style={{ width: '100%' }}
            onClick={handleCreateGroup}
            $variant="green"
          >
            Add
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  )
}

export default Register
