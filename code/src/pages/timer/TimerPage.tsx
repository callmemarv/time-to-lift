import { useTimerPageReducer } from 'pages/timer/TimerPageReducer.tsx'
import { TimerStopped } from 'pages/timer/stopped/TimerStopped.tsx'
import { TimerRunning } from 'pages/timer/running/TimerRunning.tsx'
import { WidgetEditor } from 'pages/timer/editing/WidgetEditor.tsx'
import { Countdown } from 'model/Countdown.ts'
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { TimerPaused } from 'pages/timer/paused/TimerPaused.tsx'
import { Wait } from 'model/Wait.ts'
import { Repeat } from 'model/Repeat.ts'

export function TimerPage() {
  const [state, dispatch] = useTimerPageReducer({
    status: 'stopped',
    widgets: [
      new Wait(uuid(), 'Exercise'),
      new Countdown(uuid(), 'Rest', 120),
      new Repeat(uuid(), 'Repeat', 5),
    ],
    runningWidgets: [],
    widgetToEdit: null,
  })

  useEffect(() => {
    if (state.status === 'running') {
      const timeout = setTimeout(() => {
        dispatch({type: 'advanceTimer'})
      }, 31)

      return () => clearTimeout(timeout)
    }
  })

  return (
    <div className={'w-full flex flex-col gap-2'}>
      {state.status === 'stopped' &&
        <TimerStopped
          widgets={state.widgets}
          onClickEdit={(index: number) => dispatch({type: 'editWidget', index})}
          onClickDelete={(index: number) => dispatch({type: 'deleteWidget', index})}
          onClickMoveUp={(index: number) => dispatch({type: 'moveWidget', index, direction: 'up'})}
          onClickMoveDown={(index: number) => dispatch({type: 'moveWidget', index, direction: 'down'})}
          onClickAddWidget={() => dispatch({type: 'editWidget', index: null})}
          onClickStart={() => dispatch({type: 'startTimer'})}
        />
      }
      {state.status === 'editing' &&
        <WidgetEditor
          widgetToEdit={state.widgetToEdit}
          onClickSave={(widget) => dispatch({type: 'saveWidget', widget})}
          onClickCancel={() => dispatch({type: 'stopTimer'})}
        />
      }
      {state.status === 'running' &&
        <TimerRunning
          runningWidgets={state.runningWidgets}
          onClickPause={() => dispatch({type: 'pauseTimer'})}
          onClickStop={() => dispatch({type: 'stopTimer'})}
        />
      }
      {state.status === 'paused' &&
        <TimerPaused
          runningWidgets={state.runningWidgets}
          onClickContinue={() => dispatch({type: 'continueTimer'})}
          onClickStop={() => dispatch({type: 'stopTimer'})}
        />
      }
    </div>
  )
}
