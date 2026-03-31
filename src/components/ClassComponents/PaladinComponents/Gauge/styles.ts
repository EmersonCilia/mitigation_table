import styled from 'styled-components'

export const GaugeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  max-width: 200px;
`
export const GaugeImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease-in-out;
`
export const GaugeNumber = styled.span`
  position: absolute;
  background: rgba(0, 0, 0);
  color: white;
  font-family: 'Michroma', monospace;

  font-size: 18px;
  font-weight: bold;
  pointer-events: none;
  line-height: 18px;
  top: 112px;
  left: 186px;
  transform: translateX(-50%);
  text-align: center;
  font-variant-numeric: tabular-nums;
`
