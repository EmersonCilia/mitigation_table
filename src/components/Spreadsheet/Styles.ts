import styled from 'styled-components'

export const Container = styled.div<{ open: boolean }>`
  max-width: ${(props) => (props.open ? '70vw' : '80vw')};
  width: 100%;
  margin: ${(props) => (props.open ? '0 100px' : '0 auto')};
  padding: 40px 0;

  @media (max-width: 768px) {
    max-width: 90vw;
    margin: 12px auto;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 90vw;
  }
`
export const AsideContainer = styled.aside<{ open: boolean }>`
  width: ${(props) => (props.open ? 'auto' : '40px')};
  position: relative;
  display: flex;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 20;

    background: white;

    transform: ${(props) =>
      props.open ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.5s ease;

    display: flex;
  }
`

export const MobileHamburger = styled.button<{ open: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 8px;
    right: 4px;
    z-index: 21;
    transform: rotate(${(props) => (props.open ? '-90deg' : '0')});
    transition: 0.3s ease-in-out;
  }
`

export const AsideDiv = styled.div<{ open: boolean }>`
  width: 280px;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #ccc;
  transform: translateX(${(props) => (props.open ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    transform: translateY(${(props) => (props.open ? '0' : '-100%')});
    height: auto;
    width: 100%;
    justify-items: center;
  }
`
export const AsideButton = styled.button<{ open: boolean }>`
  position: absolute;
  left: ${(props) => (props.open ? '210px' : '0')};
  transition: left 0.3s ease-in-out;
  z-index: 10;
  cursor: pointer;

  img {
    transition: transform 0.3s ease-in-out;
    transform: rotate(${(props) => (props.open ? '-90deg' : '0')});
  }
  @media (max-width: 768px) {
    display: none;
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
  transition: transform 0.3s ease-in-out;
`

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
  justify-self: end;

  @media (max-width: 768px) {
    justify-self: normal;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
  }
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
  border: 2px solid black;
`
export const SpreadSheet = styled.div`
  display: flex;
  justify-items: center;
`
