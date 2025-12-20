import styled from 'styled-components'

export const JobsAside = styled.div`
  display: grid;
  grid-template-columns: 60px 60px 60px 60px;
  transition: left 0.3s ease-in-out;
  margin-top: 12px;
  gap: 20px 10px;
`

export const AsideContainer = styled.aside`
  height: auto;
  width: 300px;
`

export const SelectJobsTitle = styled.h3`
  margin: 40px 0;

  @media (max-width: 480px) {
    margin: 16px 0;
  }
`
