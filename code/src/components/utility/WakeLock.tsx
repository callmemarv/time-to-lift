import video from 'assets/black.mp4'

export function WakeLock() {
  return (
    <video autoPlay loop muted className={'w-0 h-0'}>
      <source src={video} type="video/mp4"/>
    </video>
  )
}
