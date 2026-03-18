import { styled } from 'styled-components'

export const RulerDiv = styled.div`
  position: relative;
  height: 40px;
  border-bottom: 2px solid #555;
  background-color: #000;
  padding: 4px;
`

export const Tick = styled.div`
  position: absolute;
  transform: translateX(-50%);
  font-size: 12px;
  color: white;
  margin-top: 8px;
`
