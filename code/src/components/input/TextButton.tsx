import { PropsWithChildren } from 'react'

interface TextButtonProps {
  disabled?: boolean
  onClick?: () => void
}

export function TextButton(props: PropsWithChildren<TextButtonProps>) {
  return (
    <button
      className={'enabled:hover:text-slate-200 enabled:hover:underline disabled:opacity-50 text-lg'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
