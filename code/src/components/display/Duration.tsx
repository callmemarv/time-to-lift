import { formatDurationAsTime } from 'utils/TimeUtils.ts'

interface DurationProps {
  durationInMillis: number
}

export function Duration(props: DurationProps) {
  return (
    <div className={'text-6xl text-center font-mono'}>
      {formatDurationAsTime(props.durationInMillis)}
    </div>
  )
}
