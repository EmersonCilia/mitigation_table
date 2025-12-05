export function timerToSeconds(timerStr: string): number {
  if (!timerStr) return 0
  // allow formats like "1:04", "0:14", "12:03", "75" (seconds)
  if (/^\d+$/.test(timerStr.trim())) return Number(timerStr.trim())

  const parts = timerStr.split(':').map((p) => Number(p.trim()))
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return 0
}
