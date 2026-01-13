import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getAllFights, createFight, deleteFight } from '../../Firebase/fights'

import * as S from './styles'
import { TrashCan } from '../../components/DataRow/styles'
import { Button } from '../../styles'

import trashCan from '../../assets/trash_can.svg'
import returnButton from '../../assets/return.svg'
import add from '../../assets/add.svg'

import { logout } from '../../Utils/auth'
import { FightsMap } from '../../Utils/types'

const Groups = () => {
  const [fights, setFights] = useState<FightsMap>({})
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
    <S.Container>
      <S.Title>{groupId} Fights</S.Title>

      <S.List>
        {Object.values(fights).map((fight) => (
          <S.FightContainer key={fight.name}>
            <TrashCan
              style={{
                border: '1px solid black',
                width: '32px',
                height: '40px',
                alignSelf: 'center',
                padding: '4px'
              }}
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
              <S.Fights>{fight.name}</S.Fights>
            </Link>
          </S.FightContainer>
        ))}
      </S.List>

      <S.InputButtonGroup>
        <Button
          $variant="red"
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
        <Button $variant="green" onClick={handleCreateFight}>
          <img src={add} alt="Add new fight" />
        </Button>
      </S.InputButtonGroup>
    </S.Container>
  )
}

export default Groups
