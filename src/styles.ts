import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  background: '#303241',
  gray: '#aaa',
  borders: '#000',
  green: '#45d369ff',
  text: '#d6d6cbff',
  asideColor: '#15161fff',
  red: '#ff5555',
  blue: '#58bbd1ff'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
    color: ${colors.text}
  }
    body{
      background-color: ${colors.background}
    }
`

export const JobSkills = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  padding: 0 4px;
  border: solid 1px ${colors.borders};
`
export const Jobs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 2px ${colors.borders};
  background-color: ${colors.background};
  min-width: 40px;
`

export const SkillsRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.background};
`

export const Button = styled.button<{ $variant?: 'red' | 'green' | 'blue' }>`
  padding: 10px 10px;
  cursor: pointer;
  border: 1px solid ${colors.borders};
  border-radius: 8px;
  color: ${colors.text};
  text-shadow: 2px 2px 4px ${colors.borders};

  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'red':
        return colors.red
      case 'blue':
        return colors.blue
      case 'green':
      default:
        return colors.green
    }
  }};
  &:hover {
    filter: brightness(1.2);
  }
`
