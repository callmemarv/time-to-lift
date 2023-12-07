import { Widget } from 'model/Widget.ts'
import { Button } from 'components/input/Button.tsx'
import { useWidgetEditorReducer } from 'pages/timer/editing/WidgetEditorReducer.tsx'
import { WidgetType } from 'model/WidgetType.ts'
import { Countdown } from 'model/Countdown.ts'
import { v4 as uuid } from 'uuid'
import { ChangeEvent } from 'react'
import { Wait } from 'model/Wait.ts'
import { Repeat } from 'model/Repeat.ts'

interface WidgetEditor {
  widgetToEdit: Widget | null // TODO: Inject a WidgetEditorState instead?
  onClickSave: (widget: Widget) => void
  onClickCancel: () => void
}

export function WidgetEditor(props: WidgetEditor) {
  const widgetToEdit = props.widgetToEdit ?? new Countdown(uuid(), 'Countdown', 60)
  const seconds = widgetToEdit instanceof Countdown ? widgetToEdit.timeInMillis / 1000 : 60
  const times = widgetToEdit instanceof Repeat ? widgetToEdit.times : 3

  const [state, dispatch] = useWidgetEditorReducer(
    {
      name: widgetToEdit.name,
      widgetType: widgetToEdit.type,
      seconds,
      times,
    }
  )

  function handleChangeWidgetType(e: ChangeEvent<HTMLSelectElement>) {
    const widgetType = e.target.value as WidgetType
    const name = widgetType.charAt(0).toUpperCase() + widgetType.slice(1)
    dispatch({type: 'setWidgetType', widgetType})
    dispatch({type: 'setName', name})
  }

  function handleChangeSeconds(e: ChangeEvent<HTMLInputElement>) {
    let seconds = parseInt(e.target.value)

    if (isNaN(seconds) || seconds < 1) {
      seconds = 1
    } else if (seconds > 3600) {
      seconds = 3600
    }
    dispatch({type: 'setSeconds', seconds})
  }

  function handleChangeTimes(e: ChangeEvent<HTMLInputElement>) {
    let times = parseInt(e.target.value)

    if (isNaN(times) || times < 1) {
      times = 1
    } else if (times > 100) {
      times = 100
    }
    dispatch({type: 'setTimes', times})
  }

  function handleClickSave() {
    const id = widgetToEdit?.id ?? uuid()
    let name = state.name.replace(/\s+/g, ' ').trim()
    let widget

    switch (state.widgetType) {
      case 'countdown': {
        if (name.length === 0) {
          name = 'Countdown'
        }
        widget = new Countdown(id, name, state.seconds)
        break
      }
      case 'wait': {
        if (name.length === 0) {
          name = 'Wait'
        }

        widget = new Wait(id, name)
        break
      }
      case 'repeat': {
        if (name.length === 0) {
          name = 'Repeat'
        }

        widget = new Repeat(id, name, state.times)
        break
      }
    }
    props.onClickSave(widget)
  }

  return (
    <form className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-1'}>
        <label
          htmlFor={'widget-editor-widget-type'}
          className={'uppercase text-xs pl-2'}
        >
          Type
        </label>
        <select
          id={'widget-editor-widget-type'}
          className={'bg-slate-900 border rounded-lg px-2 h-[42px] hover:bg-slate-800'}
          value={state.widgetType}
          onChange={handleChangeWidgetType}
        >
          <option value={'countdown'}>Countdown</option>
          <option value={'wait'}>Wait</option>
          <option value={'repeat'}>Repeat</option>
        </select>
      </div>
      <div className={'flex flex-col gap-1'}>
        <label
          htmlFor={'widget-editor-name'}
          className={'uppercase text-xs pl-2'}
        >
          Name
        </label>
        <input
          id={'widget-editor-name'}
          type={'text'}
          className={'bg-slate-900 border rounded-lg p-2'}
          value={state.name}
          maxLength={12}
          onChange={(e) => dispatch({type: 'setName', name: e.target.value})}
        />
      </div>
      {state.widgetType === 'countdown' &&
        <div className={'flex flex-col gap-1'}>
          <label
            htmlFor={'widget-editor-seconds'}
            className={'uppercase text-xs pl-2'}
          >
            Seconds
          </label>
          <input
            id={'widget-editor-seconds'}
            type={'number'}
            className={'bg-slate-900 border rounded-lg p-2'}
            value={state.seconds}
            required={true}
            min={1}
            max={3600}
            onChange={handleChangeSeconds}
          />
        </div>
      }
      {state.widgetType === 'repeat' &&
        <div className={'flex flex-col gap-1'}>
          <label
            htmlFor={'widget-editor-times'}
            className={'uppercase text-xs pl-2'}
          >
            Times
          </label>
          <input
            id={'widget-editor-times'}
            type={'number'}
            className={'bg-slate-900 border rounded-lg p-2'}
            value={state.times}
            required={true}
            min={1}
            max={100}
            onChange={handleChangeTimes}
          />
        </div>
      }
      <div className={'flex gap-2'}>
        <Button type={'reset'} className={'flex-1'} onClick={props.onClickCancel}>
          Cancel
        </Button>
        <Button type={'submit'} className={'flex-1'} onClick={handleClickSave}>
          Save
        </Button>
      </div>
    </form>
  )
}
