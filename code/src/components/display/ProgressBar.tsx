interface ProgressBarProps {
  progressInPercent: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div
      className={'h-4 bg-slate-100'}
      style={{width: `${props.progressInPercent}%`}} // This cannot be done with Tailwind's w-[`${progressInPercent}%`]
    />
  )
}
