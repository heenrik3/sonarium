import usePlayer from '../../store/usePlayer'
import { parseTime } from '../../utils'

function ProgressBar() {
  const { playAllowed, duration, currentTime, seekTime } = usePlayer()

  function handleSeekChange(e: any) {
    seekTime(+e.target.value)
  }

  return (
    <div className={`playing__progress ${!playAllowed ? 'disabled' : ''}`}>
      <input
        type="range"
        min={0}
        max={duration || 200}
        step={1}
        value={currentTime}
        onChange={handleSeekChange}
      />
      <div className="playing__time">
        <span>{parseTime(currentTime)}</span>
        <span>{parseTime(duration)}</span>
      </div>
    </div>
  )
}

export default ProgressBar
