import { Link, useParams } from 'react-router-dom'
import useLibrary from '../../store/useLibrary'
import { useEffect, useState } from 'react'
import usePlayer from '../../store/usePlayer'
import PlayBtn from '../../components/PlayBtn'
import useTheme from '../../store/useTheme'
import { UNKNOWN_ALBUM_COVER, UNKNOWN_ARTIST_COVER } from '../../utils'

function Artist() {
    const { id }: any = useParams()

    const { theme } = useTheme()
    const { getArtistInfo, getDiscography } = useLibrary()
    const { setToPlaylist } = usePlayer()
    const [artist, setArtist]: any = useState()

    const handlePlayArtist = () => {
        setToPlaylist(getDiscography(id))
    }

    useEffect(() => setArtist(getArtistInfo(id)), [id, getArtistInfo])

    if (!artist)
        return (
            <div className='artist'>
                <header className='artist__header'>
                    <div>
                        <Link to='/' className='btn btn--circle'>
                            <button>
                                <i className='fa-solid fa-caret-left'></i>
                            </button>
                        </Link>
                    </div>

                    <h2 className='logo'>SONARIUM</h2>
                </header>

                <h1>Sem artista</h1>
            </div>
        )

    const tracks = artist.songs.map((song: any, i: number) => (
        <li className={`artist__track artist__track--${theme}`} key={i}>
            <span>{song.title}</span>
        </li>
    ))

    const albums = artist.albums.map((album: any, i: number) => (
        <Link className='artist__album' to={`/album/${album.title}`} key={i}>
            <li>
                <picture>
                    <img
                        src={album.cover ? album.cover : UNKNOWN_ALBUM_COVER}
                    />
                </picture>

                <span>{album.title}</span>
            </li>
        </Link>
    ))

    return (
        <>
            <div className='artist'>
                <header className='artist__header'>
                    <div>
                        <Link to='/' className='btn btn--circle'>
                            <button>
                                <i className='fa-solid fa-caret-left'></i>
                            </button>
                        </Link>
                    </div>

                    <h2 className='logo'>SONARIUM</h2>
                </header>
                <picture className='artist__picture'>
                    <img
                        className='artist__img'
                        src={artist.img || UNKNOWN_ARTIST_COVER}
                    />

                    <PlayBtn handler={handlePlayArtist} />
                </picture>

                <h1>{id}</h1>

                <div className={`artist__tracks`}>
                    <h3>Top Músicas</h3>

                    <div className='scrollable'>
                        <ul>{tracks}</ul>
                    </div>
                </div>

                <div className='artist__albums'>
                    <h3>Álbuns</h3>
                    <div className='scrollable'>
                        <ul>{albums}</ul>
                    </div>
                </div>
            </div>
            <span className='copyright'>SONARIUM ©</span>
        </>
    )
}

export default Artist
