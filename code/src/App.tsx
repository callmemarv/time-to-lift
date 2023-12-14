import './App.css'
import { TimerPage } from './pages/timer/TimerPage.tsx'
import { WakeLock } from './components/utility/WakeLock.tsx'
import { FaGithub } from 'react-icons/fa6'

export function App() {
  return (
    <WakeLock>
      <div className={'bg-slate-900 min-h-screen p-4 flex'}>
        <main className={'grow max-w-xs mx-auto text-slate-100 flex flex-col gap-2 justify-between items-center'}>
          <TimerPage/>
          <div>
            <a
              href={'https://github.com/callmemarv/time-to-lift'}
              target={'_blank'}
              className={'text-4xl hover:text-slate-200'}>
              <FaGithub/>
            </a>
          </div>
        </main>
      </div>
    </WakeLock>
  )
}
