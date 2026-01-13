import styled from 'styled-components'
import { colors } from '../../styles'

export const Container = styled.div`
  max-width: 1024px;
  margin: 40px auto;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-bottom: 40px;
`

export const List = styled.ul`
  width: 40%;

  @media (max-width: 480px) {
    width: 70%;
  }
`

export const Fights = styled.li`
  margin: 10px 0;
  width: 100%;
  border: 2px solid ${colors.borders};
  height: 40px;
  text-align: center;
  padding: 10px;
  text-decoration: none;
`
export const FightContainer = styled.div`
  display: flex;
  width: 100%;
`
export const InputButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;

  @media (min-width: 768px) {
    width: 40%;
  }
`
