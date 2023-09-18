import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePlayer from '../../store/usePlayer'
import useLibrary from '../../store/useLibrary'
import ProgressBar from '../../components/ProgressBar'
import Lyrics from '../../components/Lyrics'
import Playlist from '../../components/Playlist'
import PlayBtn from '../../components/PlayBtn'
import { UNKNOWN_ALBUM_COVER } from '../../utils'

function PlayingNow() {
  const {
    togglePlay,
    playing,
    paused,
    currentSong,
    previousSong,
    nextSong,
    forwardAllowed,
    backwardAllowed,
    toggleUpdateAllowed,
  }: any = usePlayer()
  const navigate = useNavigate()
  const { getSongInfo } = useLibrary()
  const [song, setSong]: any = useState()
  const [height, setHeight] = useState(`${window.innerHeight}px`)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [lyricsOpen, setLyricsOpen] = useState(false)

  const togglePlaylist = () => setPlaylistOpen(!playlistOpen)
  const toggleLyrics = () => setLyricsOpen(!lyricsOpen)

  const handleOpenPlaylist = () => {
    toggleUpdateAllowed()
    togglePlaylist()
  }

  const handleLyrics = () => {
    if (!currentSong.isSearchable) return
    toggleUpdateAllowed()
    toggleLyrics()
  }

  const handleOnPlay = () => {
    togglePlay()
  }

  const handleBackward = () => {
    if (backwardAllowed) previousSong()
  }

  const handleForward = () => {
    if (forwardAllowed) nextSong()
  }

  useEffect(() => {
    if (!playing && !paused) return navigate('/')

    if (currentSong) setSong(getSongInfo(currentSong))

    window.addEventListener('resize', () =>
      setHeight(`${window.innerHeight}px`)
    )
  }, [currentSong, getSongInfo])

  return (
    <Fragment>
      <div className="playing" style={{ height }}>
        <header className="header">
          <div className="btn btn--circle">
            <Link to="/">
              <i className="fa-solid fa-caret-left"></i>
            </Link>
          </div>
          <span className="logo">TOCANDO AGORA</span>

          <div className="btn btn--circle">
            <button onClick={handleOpenPlaylist}>
              <i className="fa-solid fa-compact-disc" />
            </button>
          </div>
        </header>

        <div className="playing__container">
          <picture className="playing__picture">
            <img
              className="playing__img"
              src={song?.album?.cover || UNKNOWN_ALBUM_COVER}
            />
          </picture>
        </div>

        <div className="playing__extras">
          <div className="playing__song">
            <span className="playing__title">
              {song?.title || 'Desconhecido'}
            </span>
            <span className="playing__artist">
              {song?.artist || 'Desconhecido'}
            </span>
          </div>

          {/* <div className="playing__favorite">
            <button>
              <i className="fa-solid fa-heart" />
            </button>
          </div> */}
        </div>

        <ProgressBar />

        <div className="playing__controls">
          {/* <div className="shuffle">
          <button onClick={toggleShuffle} disabled={!shuffle}>
            <i className="fa-solid fa-shuffle" />
          </button>
        </div> */}

          <div className="playing__controls--main">
            <div className={`backward ${!backwardAllowed ? 'disabled' : ''}`}>
              <button onClick={handleBackward}>
                <i className="fa-solid fa-backward-step" />
              </button>
            </div>

            <PlayBtn handler={handleOnPlay} />

            <div className={`forward ${!forwardAllowed ? 'disabled' : ''}`}>
              <button onClick={handleForward}>
                <i className="fa-solid fa-forward-step" />
              </button>
            </div>
          </div>

          {/* <div className="repeat">
          <button onClick={toggleShuffle}>
            <i className="fa-solid fa-repeat" />
          </button>
        </div> */}
        </div>

        <div className="playing__actions">
          <div
            className={`playing__action ${
              !currentSong.isSearchable ? 'disabled' : ''
            }`}
          >
            <button onClick={handleLyrics}>
              <span>Letra</span> <i className="fa-solid fa-angle-up" />
            </button>
          </div>
        </div>
      </div>
      {playlistOpen && <Playlist handler={handleOpenPlaylist} />}
      {lyricsOpen && <Lyrics handler={handleLyrics} />}
    </Fragment>
  )
}

export default PlayingNow
