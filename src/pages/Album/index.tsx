import { Link, useParams } from 'react-router-dom'
import useLibrary from '../../store/useLibrary'
import { useEffect, useState } from 'react'
import usePlayer from '../../store/usePlayer'
import PlayBtn from '../../components/PlayBtn'
import useTheme from '../../store/useTheme'
import { UNKNOWN_ALBUM_COVER } from '../../utils'

function Album() {
  const { id }: any = useParams()
  const { theme } = useTheme()

  const { getAlbum } = useLibrary()
  const { setToPlaylist } = usePlayer()
  const [album, setAlbum]: any = useState()

  useEffect(() => setAlbum(getAlbum(id)), [id])

  const handlePlayAlbum = () => {
    setToPlaylist(album.tracks)
  }

  if (!album) return <h1> No tracks</h1>

  const tracks = album.tracks.map((track: any, i: number) => (
    <li className="album__track" key={i}>
      {i + 1} - {track.title}
    </li>
  ))

  return (
    <>
      <div className="album">
        <header className="album__header">
          <img src={album.cover || UNKNOWN_ALBUM_COVER} />

          <div className="go-back">
            <div>
              <Link to="/">
                <button className="btn btn--circle">
                  <i className="fa-solid fa-caret-left"></i>
                </button>
              </Link>
            </div>
          </div>
        </header>

        <section className={`section section--${theme}`}>
          <div className="section__header">
            <div>
              <h1>{id}</h1>
              <p>{album.artist}</p>
            </div>

            <PlayBtn handler={handlePlayAlbum} />
          </div>

          <h3>Faixas</h3>
          <div className="section__scrollable">
            <ul className="album__list">{tracks}</ul>
          </div>

          <span className="copyright">SONARIUM ©</span>
        </section>
      </div>
    </>
  )
}

export default Album
