import { useState } from 'react'
import { Container, Title } from './styles'
import { createGroup } from '../../firebase/fights'
import { Button } from '../../styles'

const Register = () => {
  const [groupName, setGroupName] = useState('')
  const [password, setPassword] = useState('')

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

        <Button onClick={handleCreateGroup} variant="green">
          Add
        </Button>
      </div>
    </Container>
  )
}

export default Register
