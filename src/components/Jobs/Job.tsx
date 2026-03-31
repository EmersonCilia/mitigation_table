import { jobSkills, JobKey } from '../Data/JobSkills'
import { Jobs, JobSkills, SkillsRow } from '../../styles'
import linkArrow from '../../assets/right-external-arrow-of-a-square-svgrepo-com.svg'

type Props = {
  job: JobKey
  skillVisibility: {
    singleMitigation: boolean
    healing: boolean
  }
  visibleJobs: string[]
}

const Job = ({ job, skillVisibility, visibleJobs }: Props) => {
  if (!visibleJobs.includes(job)) return null

  const visibleSkills = jobSkills[job].filter((skill) => {
    if (skill.type === 'singleMitigation')
      return skillVisibility.singleMitigation

    if (skill.type === 'healing') return skillVisibility.healing

    return true
  })

  return (
    <Jobs>
      <p>
        {job}
        <img src={linkArrow} alt="" style={{ width: '12px', height: '12px' }} />
      </p>
      <SkillsRow>
        {visibleSkills.map((skill) => (
          <JobSkills key={skill.alt} src={skill.src} alt={skill.alt} />
        ))}
      </SkillsRow>
    </Jobs>
  )
}

export default Job
