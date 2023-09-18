import { useEffect, useState } from 'react'
import usePlayer from '../../store/usePlayer'
import Spinner from '../Spinner'
import Modal from '../Modal'

function Lyrics(props: any) {
  const { currentSong }: any = usePlayer()
  const [lyrics, setLyrics]: any = useState()
  const [loading, setLoading] = useState(true)

  const handleCloseLyrics = () => props.handler()

  useEffect(() => {
    const { artist, title } = currentSong

    fetch(`${import.meta.env.VITE_LYRICS_API}artist=${artist}&song=${title}`)
      .then((response) => response.json())
      .then((data) => {
        setLyrics(data.data)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <Modal>
        <div className="lyrics">
          <header className="lyrics__header">
            <div className="lyrics__info"></div>

            <div className="lyrics__close">
              <button onClick={handleCloseLyrics}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </header>

          <Spinner />
          <span className="copyright">SONARIUM ©</span>
        </div>
      </Modal>
    )

  return (
    <Modal>
      <div className="lyrics">
        <header className="lyrics__header">
          <div className="lyrics__info">
            {lyrics ? (
              <>
                <h1>{lyrics.title}</h1>
                <p>por {lyrics.artist}</p>
              </>
            ) : null}
          </div>

          <div className="lyrics__close">
            <button onClick={handleCloseLyrics}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </header>

        <div className="lyrics__scroll">
          <div className="lyrics__text">
            {lyrics ? <p>{lyrics.lyrics}</p> : <p> Não há nada por aqui...</p>}
          </div>
        </div>
        <span className="copyright">SONARIUM ©</span>
      </div>
    </Modal>
  )
}

export default Lyrics
