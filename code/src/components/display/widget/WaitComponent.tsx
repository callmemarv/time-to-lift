import { Wait } from 'model/Wait.ts'

interface WaitProps {
  wait: Wait
}

export function WaitComponent(props: WaitProps) {
  const wait = props.wait

  return (
    <div className={'text-4xl text-white text-center'}>{wait.name}</div>
  )
}
