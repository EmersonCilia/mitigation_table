import { css, keyframes, styled } from 'styled-components'

const march = keyframes`
  to {
    stroke-dashoffset: 15;
  }
`

export const SpellButton = styled.button<{ $glow?: boolean }>`
  border: none;
  background: transparent;
  cursor: pointer;
  height: 44px;
  width: 44px;
  position: relative;
  ${({ $glow }) =>
    $glow &&
    css`
      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        rect {
          stroke: #ffd000;
          stroke-width: 2;
          fill: none;
          rx: 6; // match button border-radius
          ry: 6;
          stroke-dasharray: 4 4;
          animation: ${march} 0.5s linear infinite;
        }
      }
    `}
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    filter: grayscale(60%);
  }
  &:disabled::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: scale(0.9);
  }
  img {
    height: 40px;
    width: 40px;
  }
`
export const ButtonDiv = styled.div`
  position: relative;

  span {
    pointer-events: none;
    height: 40px;
    width: 40px;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 4px black;
    z-index: 2;
  }
`
export const Spells = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 8px;
  margin: 20px 0;
`
