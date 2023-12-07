import { Button } from 'components/input/Button.tsx'
import { Widget } from 'model/Widget.ts'
import { CountdownComponent } from 'components/display/widget/CountdownComponent.tsx'
import { Countdown } from 'model/Countdown.ts'
import { Wait } from 'model/Wait.ts'
import { WaitComponent } from 'components/display/widget/WaitComponent.tsx'

interface TimerPausedProps {
  runningWidgets: Widget[]
  onClickContinue: () => void
  onClickStop: () => void
}

export function TimerPaused(props: TimerPausedProps) {
  const activeWidget = props.runningWidgets[0]

  return (
    <>
      <div className={'h-60 flex flex-col gap-4'}>
        {activeWidget instanceof Countdown && <CountdownComponent countdown={activeWidget}/>}
        {activeWidget instanceof Wait && <WaitComponent wait={activeWidget}/>}
      </div>
      <div className={'flex gap-2'}>
        <Button className={'flex-1'} onClick={props.onClickContinue}>
          Continue
        </Button>
        <Button className={'flex-1'} onClick={props.onClickStop}>
          Stop
        </Button>
      </div>
    </>
  )
}
