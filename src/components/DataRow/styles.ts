import styled from 'styled-components'
import { colors } from '../../styles'

export const TextArea = styled.textarea`
  resize: none;
  height: 48px;
  width: 100px;
  text-align: center;
  padding: 8px 4px;
  background: ${colors.white};
  border: solid 1px ${colors.borders};
`

export const Job = styled.div`
  border: solid 2px ${colors.borders};
  justify-content: center;
  align-items: center;
  min-width: 40px;
  background-color: ${colors.white};
`

export const SelectionOption = styled.select`
  width: 80px;
  background-color: ${colors.white};
  border: solid 1px ${colors.borders};
`
export const OptionSelection = styled.option`
  background-color: ${colors.white};
  border: solid 1px ${colors.borders};
`

export const CheckboxWrapper = styled.div<{ active: boolean }>`
  padding: 12px 0px;
  background: ${(props) => (props.active ? colors.green : 'transparent')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const Checkbox = styled.input`
  margin: auto 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`
export const TrashCan = styled.img`
  background: ${colors.white};
  width: 20px;
  cursor: pointer;
`
