export function currentTimeInEpochMillis(): number {
  return new Date().getTime()
}

export function formatDurationAsTime(durationInMillis: number): string {
  const {hours, minutes, seconds} = splitDuration(durationInMillis)

  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = seconds.toString().padStart(2, '0')
  let formattedDuration = `${paddedMinutes}:${paddedSeconds}`

  if (hours > 0) {
    const paddedHours = hours.toString().padStart(2, '0')
    formattedDuration = `${paddedHours}:${formattedDuration}`
  }
  return formattedDuration
}

export function formatDurationAsText(durationInMillis: number): string {
  const {hours, minutes, seconds} = splitDuration(durationInMillis)

  let formattedDuration = ''

  if (seconds > 0) {
    formattedDuration = `${seconds}s`
  }
  if (minutes > 0) {
    formattedDuration = `${minutes}m ${formattedDuration}`
  }
  if (hours > 0) {
    formattedDuration = `${hours}h ${formattedDuration}`
  }
  return formattedDuration.trim()
}

function splitDuration(durationInMillis: number): { hours: number, minutes: number, seconds: number } {
  const totalSeconds = Math.ceil(durationInMillis / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {hours, minutes, seconds}
}
