import usePlayer from '../../store/usePlayer'

function PlayBtn(props: any) {
  const { playAllowed, playing, paused, playlist } = usePlayer()

  return (
    <div
      className={`play-btn ${
        !playAllowed || !playlist.length ? 'disabled' : ''
      }`}
    >
      <button onClick={props.handler}>
        <i className={`fa-solid fa-${playing && !paused ? 'pause' : 'play'}`} />
      </button>
    </div>
  )
}

export default PlayBtn
