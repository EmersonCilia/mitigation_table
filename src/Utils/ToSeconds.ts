export const toSeconds = (timer: string) => {
  const [m = '0', s = '0'] = timer.split(':')
  return Number(m) * 60 + Number(s)
}
