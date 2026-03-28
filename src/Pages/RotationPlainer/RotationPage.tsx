// Pages/RotationPlanner/RotationPage.tsx
import { useParams } from 'react-router-dom'
import RotationTimeline from '../../components/RotationTimeline/RotationTimeline'
import { jobRegistry, Job } from './JobRegistry'

export default function RotationPage() {
  const { jobId } = useParams()

  const job = jobId as Job
  const JobConfig = jobRegistry[job]

  if (!JobConfig) {
    return <div>Job not found</div>
  }

  return (
    <RotationTimeline<typeof JobConfig.stateType>
      SpellBarComponent={JobConfig.SpellBarComponent}
      GaugeComponent={JobConfig.GaugeComponent}
      simulate={JobConfig.simulate}
      job={job}
    />
  )
}
