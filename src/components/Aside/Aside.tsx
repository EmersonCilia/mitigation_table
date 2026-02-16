import { SkillVisibility } from '../../Utils/types'
import { JobRole } from '../Data/JobSkills'
import { JobsAside, SelectJobsTitle } from './styles'

type Job = {
  img: string
  job: string
  role: JobRole
}

type Props = {
  jobs: Job[]
  activeJobs: string[]
  toggleJob: (id: string) => void
  skillVisibility: SkillVisibility
  setSkillVisibility: React.Dispatch<React.SetStateAction<SkillVisibility>>
}

const Aside = ({
  jobs,
  activeJobs,
  toggleJob,
  skillVisibility,
  setSkillVisibility
}: Props) => {
  const jobsByRole = jobs.reduce<Record<JobRole, Job[]>>(
    (acc, job) => {
      acc[job.role].push(job)
      return acc
    },
    {
      tank: [],
      healer: [],
      melee: [],
      caster: [],
      ranged: []
    }
  )

  return (
    <>
      <SelectJobsTitle>Select jobs:</SelectJobsTitle>
      {Object.entries(jobsByRole).map(([role, roleJobs]) => (
        <div key={role} style={{ marginTop: '16px' }}>
          <h4>{role.toUpperCase()}</h4>
          <JobsAside>
            {roleJobs.map((job) => (
              <label key={job.job} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={activeJobs.includes(job.job)}
                  onChange={() => toggleJob(job.job)}
                />
                <img
                  src={job.img}
                  alt={job.job}
                  style={{ marginLeft: 4, height: 20 }}
                />
              </label>
            ))}
          </JobsAside>
        </div>
      ))}

      <h3 style={{ marginTop: '48px' }}>Skill visibility:</h3>
      <JobsAside style={{ gridTemplateColumns: '80px 80px 80px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={skillVisibility.singleMitigation}
            onChange={() =>
              setSkillVisibility((v) => ({
                ...v,
                singleMitigation: !v.singleMitigation
              }))
            }
          />
          <p style={{ marginLeft: '4px' }}>Single mitigation</p>
        </label>

        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={skillVisibility.healing}
            onChange={() =>
              setSkillVisibility((v) => ({
                ...v,
                healing: !v.healing
              }))
            }
          />
          <p style={{ marginLeft: '4px' }}>Healing</p>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={skillVisibility.numbers}
            onChange={() =>
              setSkillVisibility((v) => ({
                ...v,
                numbers: !v.numbers
              }))
            }
          />
          <p style={{ marginLeft: '4px' }}>Damage info</p>
        </label>
      </JobsAside>
    </>
  )
}

export default Aside
