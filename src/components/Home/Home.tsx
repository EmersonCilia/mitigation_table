import { useEffect, useState } from 'react'
import { getAllFights, createFight } from '../../firebase/fights'
import { Link } from 'react-router-dom'
import { Container, Fights, List, Title } from './styles'

const Home = () => {
  const [fights, setFights] = useState<any>({})
  const [newFightName, setNewFightName] = useState('')

  const loadFights = () => {
    getAllFights().then((data) => setFights(data))
  }

  useEffect(() => {
    loadFights()
  }, [])

  const handleCreateFight = async () => {
    if (!newFightName.trim()) return

    await createFight(newFightName.trim())
    setNewFightName('') // clear input
    loadFights() // refresh list
  }

  return (
    <Container>
      <Title>Cannoli Fights</Title>

      <List>
        {Object.values(fights).map((fight: any) => (
          <Link key={fight.name} to={`/fight/${fight.name}`}>
            <Fights>{fight.name}</Fights>
          </Link>
        ))}
      </List>
      {/* Input + button */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="New fight name..."
          value={newFightName}
          onChange={(e) => setNewFightName(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button
          onClick={handleCreateFight}
          style={{
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
    </Container>
  )
}

export default Home
