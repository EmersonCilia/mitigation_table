export default function shield(potency: number, MND: number, DET: number) {
  const MAIN = 440
  const DIV = 2780
  const JOB_MOD = 115
  const TRAIT = 130
  const WD = 158

  const fHMP = Math.floor((100 * (MND - MAIN)) / DIV) + 100
  const fDET = Math.floor((130 * (DET - MAIN)) / DIV + 1000)
  const fWD = Math.floor((MAIN * JOB_MOD) / 1000 + WD)

  const H1 = Math.floor((potency * fHMP * fDET) / 100 / 1000)
  const H2 = Math.floor((H1 * fWD) / 100)
  const H3 = Math.floor((H2 * TRAIT) / 100)

  const final = Math.floor(H3 * 8.15)

  return final
}
