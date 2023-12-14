import NoSleep from 'nosleep.js'
import { useEffect } from 'react'

export function WakeLock() {
  useEffect(() => {
    const noSleep = new NoSleep()
    noSleep.enable()

    console.log('enabled')

    return () => {
      noSleep.disable()
      console.log('disabled')
    }
  })

  return <></>
}
