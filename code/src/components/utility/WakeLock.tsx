import NoSleep from 'nosleep.js'
import { PropsWithChildren, useState } from 'react'

export function WakeLock(props: PropsWithChildren) {
  const [enabled, setEnabled] = useState(false)

  function enableWakeLock() {
    if (!enabled) {
      const noSleep = new NoSleep()
      noSleep.enable()
        .then(() => setEnabled(true))
    }
  }

  return <div onClick={enableWakeLock}>{props.children}</div>
}
