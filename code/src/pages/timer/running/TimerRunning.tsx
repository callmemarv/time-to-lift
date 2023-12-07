import { Button } from 'components/input/Button.tsx'
import { Widget } from 'model/Widget.ts'
import { CountdownComponent } from 'components/display/widget/CountdownComponent.tsx'
import { Countdown } from 'model/Countdown.ts'
import { WaitComponent } from 'components/display/widget/WaitComponent.tsx'
import { Wait } from 'model/Wait.ts'

interface TimerRunningProps {
  runningWidgets: Widget[]
  onClickPause: () => void
  onClickStop: () => void
}

export function TimerRunning(props: TimerRunningProps) {
  const activeWidget = props.runningWidgets[0]

  return (
    <>
      <div className={'h-60 flex flex-col gap-4'}>
        {activeWidget instanceof Countdown && <CountdownComponent countdown={activeWidget}/>}
        {activeWidget instanceof Wait && <WaitComponent wait={activeWidget}/>}
      </div>
      <div className={'flex gap-2'}>
        {activeWidget instanceof Countdown &&
          <Button className={'flex-1'} onClick={props.onClickPause}>
            Pause
          </Button>
        }
        <Button className={'flex-1'} onClick={props.onClickStop}>
          Stop
        </Button>
      </div>
    </>
  )
}
