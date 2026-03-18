import styled from 'styled-components'

export const Timeline = styled.div`
  position: relative;
  height: 600px;
  width: 840px;
  background-color: #19191a;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Action = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`

export const Castbar = styled.div`
  height: 6px;
  background: orange;
  flex: 1;
`

export const Downtime = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background: rgba(200, 0, 0, 0.3);
  pointer-events: none;
`
export const Row = styled.div`
  position: absolute;
  width: 100%;
  height: 140px;
  border: 1px solid #444;
  background-color: #121213;
`
