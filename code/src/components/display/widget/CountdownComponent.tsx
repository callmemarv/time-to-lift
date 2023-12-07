import { Duration } from 'components/display/Duration.tsx'
import { ProgressBar } from 'components/display/ProgressBar.tsx'
import { Countdown } from 'model/Countdown.ts'

interface CountdownProps {
  countdown: Countdown
}

export function CountdownComponent(props: CountdownProps) {
  const countdown = props.countdown

  return (
    <>
      <div className={'text-4xl text-white text-center'}>{countdown.name}</div>
      <Duration durationInMillis={countdown.remainingTimeInMillis}/>
      <div className={'flex justify-end'}>
        <ProgressBar progressInPercent={100 * countdown.remainingTimeInMillis / countdown.timeInMillis}/>
      </div>
    </>
  )
}
