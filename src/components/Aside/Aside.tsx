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
    <aside
      style={{
        padding: '20px',
        borderRight: '1px solid #ccc'
      }}
    >
      <h3>Select jobs:</h3>
      <div style={{ display: 'flex' }}>
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
      </div>
    </aside>
  )
}

export default Aside
