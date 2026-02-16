import styled from 'styled-components'
import { colors } from '../../styles'

export const TextArea = styled.textarea`
  resize: none;
  height: 52px;
  width: 100px;
  text-align: center;
  padding: 8px 4px;
  background: ${colors.background};
  border: solid 1px ${colors.borders};
  scrollbar-width: none;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
`

export const Job = styled.div`
  border: solid 2px ${colors.borders};
  justify-content: center;
  align-items: center;
  min-width: 40px;
  background-color: ${colors.background};
  height: 52px;
`

export const SelectionOption = styled.select`
  width: 100px;
  background-color: ${colors.background};
  border: solid 1px ${colors.borders};
  padding: 8px;
  height: 52px;
`
export const OptionSelection = styled.option`
  background-color: ${colors.background};
  border: solid 1px ${colors.borders};
`

export const CheckboxWrapper = styled.div<{
  $colorstate?: 'default' | 'green' | 'red'
}>`
  padding: 14px 0px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: ${({ $colorstate }) =>
    $colorstate === 'green'
      ? colors.green
      : $colorstate === 'red'
        ? '#ff5c5c'
        : 'transparent'};

  transition: background 0.2s ease;
`

export const Checkbox = styled.input`
  margin: auto 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`
export const TrashCan = styled.img`
  background: ${colors.background};
  width: 20px;
  cursor: pointer;
  height: 50px;
  border: solid 1px ${colors.borders};
`
