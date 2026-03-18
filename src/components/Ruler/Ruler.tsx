import { OFFSET, PIXELS_PER_SECOND, ROW_DURATION } from '../../Utils/types'
import * as S from './styles'

interface Props {
  row: number
  timelinestart: number
}
export default function Ruler({ row, timelinestart }: Props) {
  const startTime = timelinestart + row * ROW_DURATION
  return (
    <S.RulerDiv>
      {Array.from({ length: ROW_DURATION + 1 }).map((_, i) => (
        <S.Tick key={i} style={{ left: OFFSET + i * PIXELS_PER_SECOND }}>
          {(startTime + i).toFixed(2)}
        </S.Tick>
      ))}
    </S.RulerDiv>
  )
}
