import { Button } from 'components/input/Button.tsx'
import { Widget } from 'model/Widget.ts'
import { WidgetList } from 'pages/timer/stopped/WidgetList.tsx'
import { Repeat } from 'model/Repeat.ts'

interface TimerStoppedProps {
  widgets: Widget[]
  onClickEdit: (index: number) => void
  onClickDelete: (index: number) => void
  onClickMoveUp: (index: number) => void
  onClickMoveDown: (index: number) => void
  onClickAddWidget: () => void
  onClickStart: () => void
}

export function TimerStopped(props: TimerStoppedProps) {
  const onlyRepeat = props.widgets.filter(widget => !(widget instanceof Repeat)).length === 0

  return (
    <>
      <WidgetList
        widgets={props.widgets}
        onClickEdit={(index: number) => props.onClickEdit(index)}
        onClickDelete={(index: number) => props.onClickDelete(index)}
        onClickMoveUp={(index: number) => props.onClickMoveUp(index)}
        onClickMoveDown={(index: number) => props.onClickMoveDown(index)}
        onClickAddWidget={props.onClickAddWidget}
      />
      <Button onClick={props.onClickStart} disabled={onlyRepeat}>Start</Button>
    </>
  )
}
