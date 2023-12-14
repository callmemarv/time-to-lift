import { useCallback, useEffect, useState } from 'react'

export function WakeLock() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel>()

  const requestWakeLock = useCallback(() => {
    navigator.wakeLock.request('screen')
      .then(setWakeLock)
      .catch(console.error)
  }, [])

  const releaseWakeLock = useCallback(() => {
    wakeLock?.release()
      .then(() => {
        setWakeLock(undefined)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if ('wakeLock' in navigator) {
      requestWakeLock()
      document.addEventListener('visibilitychange', requestWakeLock)

      return () => {
        releaseWakeLock()
        document.removeEventListener('visibilitychange', requestWakeLock)
      }
    }
  }, [requestWakeLock, releaseWakeLock])

  return (
    <>
      {!wakeLock &&
        <video autoPlay loop muted className={'w-0 h-0'}>
          <source
            src={'https://github.com/callmemarv/time-to-lift/raw/main/code/src/assets/black.mp4'}
            type={'video/mp4'}
          />
        </video>
      }
    </>
  )
}
