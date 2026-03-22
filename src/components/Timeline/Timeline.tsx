import {
  Action,
  Downtime,
  OFFSET,
  PIXELS_PER_SECOND,
  ROW_DURATION
} from '../../Utils/types'
import * as S from './styles'
import Ruler from '../Ruler/Ruler'

const ROW_HEIGHT = 145

interface Props {
  actions: Action[]
  downtimes: Downtime[]
  timelineStart: number
  bossSkills: { name: string; start: number }[]
}

export default function Timeline({
  actions,
  downtimes,
  timelineStart,
  bossSkills
}: Props) {
  const maxTime = Math.max(
    4,
    ...actions.map((a) => a.start + a.cast),
    ...downtimes.map((d) => d.start + d.duration),
    ...bossSkills.map((bs) => bs.start)
  )

  const timelineMaxTime = maxTime - timelineStart
  const rowCount = Math.ceil(timelineMaxTime / ROW_DURATION)

  return (
    <S.Timeline>
      {Array.from({ length: rowCount }).map((_, row) => {
        const rowStart = timelineStart + row * ROW_DURATION
        const rowEnd = rowStart + ROW_DURATION

        return (
          <S.Row key={row} style={{ top: row * (ROW_HEIGHT - 3) }}>
            <Ruler row={row} timelinestart={timelineStart} />

            {downtimes
              .filter((dt) => {
                const dtEnd = dt.start + dt.duration
                return dt.start < rowEnd && dtEnd > rowStart
              })
              .map((dt) => {
                const dtEnd = dt.start + dt.duration

                const visibleStart = Math.max(dt.start, rowStart)
                const visibleEnd = Math.min(dtEnd, rowEnd)
                const visibleDuration = visibleEnd - visibleStart

                const timeInRow = visibleStart - rowStart
                const left = OFFSET + timeInRow * PIXELS_PER_SECOND
                const width = visibleDuration * PIXELS_PER_SECOND

                return (
                  <S.Downtime key={dt.id + '-' + row} style={{ left, width }} />
                )
              })}

            {actions
              .filter((action) => {
                const actionEnd = action.start + action.cast
                return action.start < rowEnd && actionEnd > rowStart
              })
              .map((action) => {
                const actionEnd = action.start + action.cast
                const isContinuation = action.start < rowStart
                const visibleStart = Math.max(action.start, rowStart)
                const visibleEnd = Math.min(actionEnd, rowEnd)
                const visibleDuration = visibleEnd - visibleStart
                const timeInRow = visibleStart - rowStart
                const left = OFFSET + timeInRow * PIXELS_PER_SECOND
                const width = visibleDuration * PIXELS_PER_SECOND
                const top =
                  action.type === 'gcd' ? (isContinuation ? 87 : 70) : 60
                const imgWidthandHeight = action.type === 'gcd' ? 35 : 18

                return (
                  <S.Action
                    key={action.id + '-' + row}
                    style={{
                      left,
                      width,
                      top: `${top}px`
                    }}
                  >
                    {action.start >= rowStart && (
                      <>
                        {action.icon && (
                          <img
                            src={action.icon}
                            style={{
                              width: `${imgWidthandHeight}px`,
                              height: `${imgWidthandHeight}px`
                            }}
                          />
                        )}
                      </>
                    )}
                    {(action.type === 'gcd' || action.name === 'Wait') && (
                      <S.Castbar />
                    )}
                  </S.Action>
                )
              })}
            {bossSkills.map((bs) => {
              if (bs.start < rowStart || bs.start > rowEnd) return null

              const left = OFFSET + (bs.start - rowStart) * PIXELS_PER_SECOND
              return (
                <S.BossSkillWrapper
                  key={bs.name + '-' + row}
                  style={{ left, height: ROW_HEIGHT }}
                >
                  <S.BossSkillLine title={bs.name} />
                  <S.BossSkillName>{bs.name}</S.BossSkillName>
                </S.BossSkillWrapper>
              )
            })}
          </S.Row>
        )
      })}
    </S.Timeline>
  )
}
