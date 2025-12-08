import { AsideContainer, JobsAside } from './styles'

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
    <AsideContainer
      style={{
        padding: '20px',
        borderRight: '1px solid #ccc'
      }}
    >
      <h3>Select jobs:</h3>
      <JobsAside>
        {jobs.map((job) => (
          <label
            key={job.job}
            style={{ display: 'block', marginBottom: '8px', marginLeft: '8px' }}
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
    </AsideContainer>
  )
}

export default Aside
