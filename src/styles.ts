import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  white: '#303241',
  gray: '#aaa',
  borders: '#000',
  green: '#50fa7b',
  text: '#f8f8f2',
  asideColor: '#15161fff'
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
      background-color: ${colors.white}
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
  background-color: ${colors.white};
  min-width: 40px;
`

export const SkillsRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
`
