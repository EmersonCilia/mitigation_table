import { styled } from 'styled-components'

export const SpellButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  height: 40px;
  width: 40px;
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
