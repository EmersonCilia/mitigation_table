import styled, { createGlobalStyle } from 'styled-components'

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

`

export const JobSkills = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  padding: 0 4px;
  border: solid 1px #000;
`
export const Jobs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 2px #000;
`
export const SkillsRow = styled.div`
  display: flex;
  flex-direction: row;
`
