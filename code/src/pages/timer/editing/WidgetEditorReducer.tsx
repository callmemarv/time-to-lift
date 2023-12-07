import { WidgetType } from 'model/WidgetType.ts'
import { Dispatch, useReducer } from 'react'

interface WidgetEditorState {
  name: string,
  widgetType: WidgetType,
  seconds: number,
  times: number,
}

interface SetName {
  type: 'setName'
  name: string
}

interface SetWidgetType {
  type: 'setWidgetType'
  widgetType: WidgetType
}

interface SetSeconds {
  type: 'setSeconds'
  seconds: number
}

interface SetTimes {
  type: 'setTimes'
  times: number
}

type WidgetEditorAction = SetName | SetWidgetType | SetSeconds | SetTimes

function reducer(state: WidgetEditorState, action: WidgetEditorAction): WidgetEditorState {
  switch (action.type) {
    case 'setName':
      return {...state, name: action.name}
    case 'setWidgetType':
      return {...state, widgetType: action.widgetType}
    case 'setSeconds':
      return {...state, seconds: action.seconds}
    case 'setTimes':
      return {...state, times: action.times}
  }
}

export function useWidgetEditorReducer(initialState: WidgetEditorState): [WidgetEditorState, Dispatch<WidgetEditorAction>] {
  return useReducer(reducer, initialState)
}
