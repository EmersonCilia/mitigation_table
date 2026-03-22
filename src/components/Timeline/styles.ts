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
export const BossSkillLine = styled.div`
  position: absolute;
  width: 1px;
  height: 80%;
  background: white;
  z-index: 5;
`
export const BossSkillWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  width: 1px;
`
export const BossSkillName = styled.div`
  color: white;
  font-size: 10px;
  text-align: center;
  margin-top: 2px;
  white-space: nowrap;
  margin-top: auto;
  margin-bottom: 15px;
`
