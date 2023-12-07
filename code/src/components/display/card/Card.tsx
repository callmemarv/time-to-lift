import { PropsWithChildren } from 'react'

interface CardProps {
  className?: string
}

export function Card(props: PropsWithChildren<CardProps>) {
  return (
    <div className={`rounded-lg p-2 ${props.className}`}>
      {props.children}
    </div>
  )
}
