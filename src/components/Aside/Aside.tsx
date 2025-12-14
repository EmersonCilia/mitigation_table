import { JobsAside } from './styles'

type Job = {
  job: string
}

type SkillVisibility = {
  singleMitigation: boolean
  healing: boolean
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
  return (
    <>
      <h3>Select jobs:</h3>
      <JobsAside>
        {jobs.map((job) => (
          <label
            key={job.job}
            style={{ display: 'block', margin: '0 8px 8px' }}
          >
            <input
              type="checkbox"
              checked={activeJobs.includes(job.job)}
              onChange={() => toggleJob(job.job)}
            />
            {job.job}
          </label>
        ))}
      </JobsAside>

      <h3 style={{ marginTop: '20px' }}>Skill visibility:</h3>
      <JobsAside>
        <label>
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
          Single mitigation
        </label>

        <label>
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
          Healing
        </label>
      </JobsAside>
    </>
  )
}

export default Aside
