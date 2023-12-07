import { Widget } from 'model/Widget.ts'
import { WidgetCard } from 'pages/timer/stopped/WidgetCard.tsx'
import { FaPlus } from 'react-icons/fa6'
import { TextButton } from 'components/input/TextButton.tsx'

interface WidgetListProps {
  widgets: Widget[]
  onClickEdit: (index: number) => void
  onClickDelete: (index: number) => void
  onClickMoveUp: (index: number) => void
  onClickMoveDown: (index: number) => void
  onClickAddWidget: () => void
}

export function WidgetList(props: WidgetListProps) {
  return (
    <div className={'flex flex-col gap-2'}>
      {props.widgets.map((widget, index) =>
        <WidgetCard
          key={widget.id}
          widget={widget}
          canBeDeleted={props.widgets.length > 1}
          canMoveUp={index !== 0}
          canMoveDown={index !== props.widgets.length - 1}
          onClickEdit={() => props.onClickEdit(index)}
          onClickDelete={() => props.onClickDelete(index)}
          onClickMoveUp={() => props.onClickMoveUp(index)}
          onClickMoveDown={() => props.onClickMoveDown(index)}
        />
      )}
      <div className={'flex justify-end'}>
        <TextButton onClick={props.onClickAddWidget}>
          <div className={'flex items-center gap-2 p-2'}>
            <FaPlus/> Add widget
          </div>
        </TextButton>
      </div>
    </div>
  )
}
