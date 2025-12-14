import { useEffect, useState } from 'react'
import { getAllFights, createFight, deleteFight } from '../../firebase/fights'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  FightContainer,
  Fights,
  InputButtonGroup,
  List,
  Title
} from './styles'
import { TrashCan } from '../DataRow/styles'
import trashCan from '../../assets/trash_can.svg'
import add from '../../assets/add.svg'
import { useParams } from 'react-router-dom'
import { logout } from '../../Utils/auth'
import returnButton from '../../assets/return.svg'
import { Button } from '../../styles'

const Groups = () => {
  const [fights, setFights] = useState<any>({})
  const [newFightName, setNewFightName] = useState('')

  const navigate = useNavigate()
  const { groupId } = useParams<{ groupId: string }>()

  const loadFights = () => {
    if (!groupId) return
    getAllFights(groupId).then((data) => setFights(data))
  }

  useEffect(() => {
    loadFights()
  }, [groupId])

  const handleCreateFight = async () => {
    if (!groupId) return
    if (!newFightName.trim()) return

    await createFight(groupId, newFightName.trim())
    setNewFightName('')
    loadFights()
  }

  if (!groupId) {
    return <div>Invalid group</div>
  }

  return (
    <Container>
      <Title>{groupId} Fights</Title>

      <List>
        {Object.values(fights).map((fight: any) => (
          <FightContainer key={fight.name}>
            <TrashCan
              src={trashCan}
              alt="trashCan"
              onClick={() => {
                if (window.confirm('Delete this fight?')) {
                  deleteFight(groupId, fight.name)
                  loadFights()
                }
              }}
            />
            <Link to={`/${groupId}/${fight.name}`} style={{ width: '100%' }}>
              <Fights>{fight.name}</Fights>
            </Link>
          </FightContainer>
        ))}
      </List>

      <InputButtonGroup>
        <Button
          variant="red"
          onClick={() => {
            logout()
            navigate('/', { replace: true })
          }}
        >
          <img src={returnButton} alt="Return Home" />
        </Button>

        <input
          type="text"
          placeholder="New fight name..."
          value={newFightName}
          onChange={(e) => setNewFightName(e.target.value)}
          style={{ padding: '8px', flex: 1, color: 'black' }}
        />
        <Button variant="green" onClick={handleCreateFight}>
          <img src={add} alt="Add new fight" />
        </Button>
      </InputButtonGroup>
    </Container>
  )
}

export default Groups
