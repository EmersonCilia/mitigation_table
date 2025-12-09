import { JobsAside } from './styles'

type Job = {
  job: string
}

type Props = {
  jobs: Job[]
  activeJobs: string[]
  toggleJob: (id: string) => void
}

const Aside = ({ jobs, activeJobs, toggleJob }: Props) => {
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
    </>
  )
}

export default Aside
