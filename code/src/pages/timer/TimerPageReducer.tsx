import { TimerStatus } from 'model/TimerStatus.ts'
import { Dispatch, useReducer } from 'react'
import { Widget } from 'model/Widget.ts'
import { Countdown } from 'model/Countdown.ts'
import { Repeat } from 'model/Repeat.ts'
import { Wait } from 'model/Wait.ts'

interface TimerPageState {
  status: TimerStatus
  widgets: Widget[]
  runningWidgets: Widget[]
  widgetToEdit: Widget | null
}

interface EditWidget {
  type: 'editWidget'
  index: number | null
}

interface SaveWidget {
  type: 'saveWidget'
  widget: Widget
}

interface DeleteWidget {
  type: 'deleteWidget'
  index: number
}

interface MoveWidget {
  type: 'moveWidget'
  index: number
  direction: 'up' | 'down'
}

interface StartTimer {
  type: 'startTimer'
}

interface PauseTimer {
  type: 'pauseTimer'
}

interface ContinueTimer {
  type: 'continueTimer'
}

interface StopTimer {
  type: 'stopTimer'
}

interface AdvanceTimer {
  type: 'advanceTimer'
}

interface StartNextWidget {
  type: 'startNextWidget'
}

type TimerPageAction =
  EditWidget
  | SaveWidget
  | DeleteWidget
  | MoveWidget
  | StartTimer
  | PauseTimer
  | ContinueTimer
  | StopTimer
  | AdvanceTimer
  | StartNextWidget

function reducer(state: TimerPageState, action: TimerPageAction): TimerPageState {
  switch (action.type) {
    case 'editWidget': {
      let widgetToEdit = null

      if (action.index !== null) {
        widgetToEdit = state.widgets[action.index].copy()
      }
      return {
        ...state,
        status: 'editing',
        widgetToEdit,
      }
    }
    case 'saveWidget': {
      const widgets = [...state.widgets]
      const index = widgets.findIndex(widget => widget.id === action.widget.id)

      if (index === -1) {
        widgets.push(action.widget)
      } else {
        widgets[index] = action.widget
      }
      return {
        ...state,
        status: 'stopped',
        widgets,
      }
    }
    case 'deleteWidget' : {
      const widgets = [...state.widgets]
      widgets.splice(action.index, 1)

      return {...state, widgets}
    }
    case 'moveWidget': {
      const widgets = [...state.widgets]
      const index = action.index

      if (action.direction === 'up') {
        // Switch widget at 'index' with counter at 'index-1' if possible
        index > 0 && (
          [widgets[index - 1], widgets[index]] = [widgets[index], widgets[index - 1]]
        )
      } else {
        // Switch widget at 'index' with counter at 'index+1' if possible
        index < widgets.length - 1 && (
          [widgets[index + 1], widgets[index]] = [widgets[index], widgets[index + 1]]
        )
      }
      return {...state, widgets: widgets}
    }
    case 'startTimer': {
      let runningWidgets: Widget[] = []

      state.widgets.forEach(widget => {
        if (widget instanceof Repeat) {
          let repeatedWidgets: Widget[] = []

          for (let i = 0; i < widget.times; i++) {
            repeatedWidgets = [...repeatedWidgets, ...runningWidgets]
          }
          runningWidgets = repeatedWidgets
        } else {
          runningWidgets.push(widget.copy())
        }
      })

      if (runningWidgets[0] instanceof Wait) {
        return {
          ...state,
          status: 'paused',
          runningWidgets,
        }
      }
      runningWidgets[0] = runningWidgets[0].start()

      return {
        ...state,
        status: 'running',
        runningWidgets,
      }
    }
    case 'pauseTimer':
      return {
        ...state,
        status: 'paused',
      }
    case 'continueTimer': {
      const activeWidget = state.runningWidgets[0]

      if (activeWidget instanceof Wait) {
        return reducer(state, {type: 'startNextWidget'})
      }
      const runningWidgets: Widget[] = []

      // TODO: Maybe copying is unnecessary here
      state.runningWidgets.forEach(widget => {
        runningWidgets.push(widget.copy())
      })
      runningWidgets[0] = runningWidgets[0].continue()

      return {
        ...state,
        status: 'running',
        runningWidgets,
      }
    }
    case 'stopTimer':
      return {
        ...state,
        status: 'stopped',
        runningWidgets: [],
      }
    case 'advanceTimer': {
      const activeWidget = state.runningWidgets[0]

      if (activeWidget.isDone()) {
        return reducer(state, {type: 'startNextWidget'})
      } else if (activeWidget instanceof Wait) {
        return reducer(state, {type: 'pauseTimer'})
      }
      return {...state}
    }
    case 'startNextWidget': {
      const activeWidget = state.runningWidgets[0]
      const runningWidgets = [...state.runningWidgets]
      runningWidgets.shift()

      if (runningWidgets.length === 0) {
        return reducer(state, {type: 'stopTimer'})
      }
      if (runningWidgets[0] instanceof Wait) {
        return reducer({...state, runningWidgets}, {type: 'pauseTimer'})
      }

      let lagInMillis = 0

      if (activeWidget instanceof Countdown) {
        lagInMillis = -activeWidget.remainingTimeInMillis
      }
      runningWidgets[0] = runningWidgets[0].start(lagInMillis)

      return {
        ...state,
        status: 'running',
        runningWidgets,
      }
    }
  }
}

export function useTimerPageReducer(initialState: TimerPageState): [TimerPageState, Dispatch<TimerPageAction>] {
  return useReducer(reducer, initialState)
}
