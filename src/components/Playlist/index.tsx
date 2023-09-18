import usePlayer from '../../store/usePlayer'
import Modal from '../Modal'

function Playlist(props: any) {
  const { playlist, currentPos, togglePlay, playAt, playing, paused } =
    usePlayer()

  const handleClosePlaylist = () => {
    props.handler()
  }

  const handlePlaylistSearch = (index: number) => {
    if (currentPos === index) return togglePlay()

    playAt(index)
  }

  const listItems = playlist.map((play: any, i: number) => (
    <li className="playlist__item" key={i}>
      <div className="playlist__action">
        <button onClick={() => handlePlaylistSearch(i)}>
          <i
            className={`fa-solid fa-circle-${
              currentPos === i && playing && !paused ? 'pause' : 'play'
            }`}
          ></i>
        </button>
      </div>
      {play.title}
    </li>
  ))

  return (
    <>
      <Modal>
        <div className="playlist">
          <header className="playlist__header">
            <h1>Playlist</h1>
            <div className="playlist__close">
              <button onClick={handleClosePlaylist}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </header>

          {!listItems.length ? (
            <span style={{ textAlign: 'center', alignSelf: 'center' }}>
              Sem músicas adicionadas
            </span>
          ) : (
            <div className="playlist__scroll">
              <ul className="playlist__list">{listItems}</ul>
            </div>
          )}
          <span className="copyright">SONARIUM ©</span>
        </div>
      </Modal>
    </>
  )
}

export default Playlist
