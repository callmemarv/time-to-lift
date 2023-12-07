import { PropsWithChildren } from 'react'

interface IconButtonProps {
  disabled?: boolean
  onClick?: () => void
}

export function IconButton(props: PropsWithChildren<IconButtonProps>) {
  return (
    <button
      className={'enabled:hover:text-slate-700 disabled:opacity-50 text-lg'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
