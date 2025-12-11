import { useEffect, useState } from 'react'
import { getAllFights, createFight, deleteFight } from '../../firebase/fights'
import { Link } from 'react-router-dom'
import { Container, FightContainer, Fights, List, Title } from './styles'
import { TrashCan } from '../DataRow/styles'
import trashCan from '../../assets/trash_can.svg'
import add from '../../assets/add.svg'

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
          <FightContainer key={fight.name}>
            <TrashCan
              src={trashCan}
              alt="trashCan"
              onClick={() => {
                if (window.confirm('Delete this fight?')) {
                  deleteFight(fight.name)
                  loadFights()
                }
              }}
            />
            <Link to={`/fight/${fight.name}`} style={{ width: '100%' }}>
              <Fights>{fight.name}</Fights>
            </Link>
          </FightContainer>
        ))}
      </List>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
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
            cursor: 'pointer',
            backgroundColor: '#50fa7b',
            border: '1px solid black',
            borderRadius: '8px'
          }}
        >
          <img src={add} alt="Back to home" />
        </button>
      </div>
    </Container>
  )
}

export default Home
