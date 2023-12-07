import { WidgetType } from 'model/WidgetType.ts'
import { PropsWithChildren } from 'react'
import { Card } from 'components/display/card/Card.tsx'

interface ColoredCardProps {
  widgetType: WidgetType
}

export function ColoredCard(props: PropsWithChildren<ColoredCardProps>) {
  switch (props.widgetType) {
    case 'countdown':
      return <Card className={'bg-sky-500'}>{props.children}</Card>
    case 'wait':
      return <Card className={'bg-amber-500'}>{props.children}</Card>
    case 'repeat':
      return <Card className={'bg-emerald-500'}>{props.children}</Card>
  }
}
