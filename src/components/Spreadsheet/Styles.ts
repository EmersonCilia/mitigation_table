import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
`

export const Sticky = styled.div`
  display: flex;
  position: sticky;
  left: 0;
  z-index: 10;
  height: 60px;

  @media (max-width: 768px) {
    position: absolute;
  }
`

export const HeaderTitle = styled.h3`
  background-color: #aaa;
  width: 120px;
  flex: 0 0 auto;
  text-align: center;
`

export const Scrolable = styled.div`
  display: flex;
  height: 60px;

  @media (max-width: 768px) {
    margin-left: 240px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: stretch;
`
export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
  justify-self: end;
`

export const LabelGroups = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`
export const Button = styled.button`
  width: 50px;
  height: 20px;
  align-self: end;
`
export const Table = styled.div`
  overflow-x: auto;
`
