import React, { PropsWithChildren } from 'react'

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  className?: string
  onClick: () => void
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (props.type === 'submit') {
      e.preventDefault()
    }
    props.onClick()
  }

  return (
    <button
      type={props.type}
      className={`border border-slate-100 rounded-lg p-2 enabled:hover:bg-slate-800 disabled:opacity-50 text-lg ${props.className}`}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
