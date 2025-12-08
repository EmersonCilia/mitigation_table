import styled from 'styled-components'

export const Container = styled.div`
  max-width: calc(80vw - 40px);
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;

  @media (max-width: 768px) {
    max-width: 95vw;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 90vw;
  }
`

export const HeaderTitle = styled.h3`
  background-color: #aaa;
  height: 48px;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid black;
`
export const Sticky = styled.div`
  display: flex;
  position: sticky;
  left: 0;
  z-index: 10;
  height: 48px;
`

export const Scrolable = styled.div`
  display: flex;
  height: 48px;
  position: absolute;
  left: 180px;
`

export const Row = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
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
export const SpreadSheet = styled.div`
  display: flex;
`
