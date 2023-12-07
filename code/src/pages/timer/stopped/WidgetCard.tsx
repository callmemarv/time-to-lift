import { Widget } from 'model/Widget.ts'
import { FaCircleDown, FaCircleUp, FaCircleXmark, FaPen } from 'react-icons/fa6'
import { IconButton } from 'components/input/IconButton.tsx'
import { Countdown } from 'model/Countdown.ts'
import { Wait } from 'model/Wait.ts'
import { Repeat } from 'model/Repeat.ts'
import { formatDurationAsText } from 'utils/TimeUtils.ts'
import { ColoredCard } from 'components/display/card/ColoredCard.tsx'

interface WidgetCardProps {
  widget: Widget
  canBeDeleted: boolean
  canMoveUp: boolean
  canMoveDown: boolean
  onClickEdit: () => void
  onClickDelete: () => void
  onClickMoveUp: () => void
  onClickMoveDown: () => void
}

export function WidgetCard(props: WidgetCardProps) {
  const widget = props.widget

  return (
    <ColoredCard widgetType={widget.type}>
      <div className={'flex gap-2 text-slate-900'}>
        <div className={'grow flex flex-col gap-2'}>
          <div className={'flex gap-2 items-baseline'}>
            <div className={'text-xl truncate'}>{widget.name}</div>
            <div>
              <IconButton onClick={props.onClickEdit}>
                <FaPen/>
              </IconButton>
            </div>
          </div>
          <div className={'text-xs font-light'}>
            {widget instanceof Countdown && `COUNTDOWN (${formatDurationAsText(widget.timeInMillis)})`}
            {widget instanceof Wait && 'WAIT FOR INPUT'}
            {widget instanceof Repeat && `REPEAT ALL OF THE ABOVE (${widget.times} times)`}
          </div>
        </div>
        <div className={'flex flex-col justify-between gap-2'}>
          <div className={'flex justify-end'}>
            <IconButton
              onClick={props.onClickDelete}
              disabled={!props.canBeDeleted}
            >
              <FaCircleXmark/>
            </IconButton>
          </div>
          <div className={'flex gap-2'}>
            <IconButton
              onClick={props.onClickMoveUp}
              disabled={!props.canMoveUp}
            >
              <FaCircleUp/>
            </IconButton>
            <IconButton
              onClick={props.onClickMoveDown}
              disabled={!props.canMoveDown}
            >
              <FaCircleDown/>
            </IconButton>
          </div>
        </div>
      </div>
    </ColoredCard>
  )
}
