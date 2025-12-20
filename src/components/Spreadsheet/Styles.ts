import styled from 'styled-components'
import { colors } from '../../styles'
import { Link } from 'react-router-dom'

export const Container = styled.div<{ open: boolean }>`
  max-width: ${(props) => (props.open ? '70vw' : '80vw')};
  width: 100%;
  margin: ${(props) => (props.open ? '0 100px' : '0 auto')};
  padding: 40px 0;

  @media (max-width: 768px) {
    max-width: 90vw;
    margin: 12px auto;
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    max-width: 90vw;
    margin: 0;
    top: 12px;
    left: 50px;
    display: block;
    position: absolute;
  }
`
export const AsideContainer = styled.aside<{ open: boolean }>`
  width: ${(props) => (props.open ? 'auto' : '40px')};
  position: relative;
  display: flex;
  z-index: 20;

  @media (max-width: 480px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 20;

    background: ${colors.background};

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

  @media (max-width: 480px) {
    display: block;
    position: fixed;
    top: 2px;
    right: 2px;
    z-index: 21;
    transform: rotate(${(props) => (props.open ? '-90deg' : '0')});
    transition: 0.3s ease-in-out;
    background-color: ${colors.text};
    border-radius: 8px;
    padding: 4px;
  }
`

export const AsideDiv = styled.div<{ open: boolean }>`
  width: 300px;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid ${colors.borders};
  transform: translateX(${(props) => (props.open ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  position: relative;
  z-index: 10;
  background: ${colors.asideColor};

  @media (max-width: 480px) {
    transform: translateY(${(props) => (props.open ? '0' : '-100%')});
    height: auto;
    width: 100%;
    height: auto;
    justify-items: center;
  }
  @media (max-width: 1400px) {
    height: auto;
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
  @media (max-width: 480px) {
    display: none;
  }
`

export const HeaderTitle = styled.h3`
  background-color: ${colors.gray};
  height: 48px;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid ${colors.borders};
  background-color: ${colors.background};
`

export const Sticky = styled.div`
  display: flex;
  position: sticky;
  left: 0;
  z-index: 10;
  height: 48px;
`

export const Scrolable = styled.div<{ $damageVisible: boolean }>`
  display: flex;
  height: 48px;
  position: absolute;
  left: ${({ $damageVisible }) => ($damageVisible ? '180px' : '188px')};
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
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-self: normal;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    flex-direction: column-reverse;
  }
`

export const LabelGroups = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  align-self: end;
  align-items: center;

  @media (max-width: 480px) {
    margin: 0px 4px;
  }
`

export const Table = styled.div`
  overflow-x: auto;
  border: 2px solid ${colors.borders};
`
export const SpreadSheet = styled.div`
  display: flex;
  justify-items: center;
  background-color: ${colors.background};
`
export const InputGroups = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-self: normal;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
  }
`

export const ButtonLink = styled(Link)`
  background-color: ${colors.red}

  &:hover {
    filter: brightness(1.2);
  }

  @media (max-width: 768px) {
    align-self: center;
    margin-top:60px;
  }
`
