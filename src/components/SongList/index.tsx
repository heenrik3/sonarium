import useLibrary from '../../store/useLibrary'
import usePlayer from '../../store/usePlayer'
import useTheme from '../../store/useTheme'

function SongList() {
    const { theme } = useTheme()
    const { songs } = useLibrary()
    const { setToPlaylist } = usePlayer()

    const handleClick = (song: any) => setToPlaylist([song])

    if (!songs.length)
        return (
            <div className='container'>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    <span>Sem músicas</span> 🎵
                </div>
            </div>
        )

    return (
        <ul className='song'>
            {songs.map((song: any, i: number) => (
                <li className={`song__item song__item--${theme}`} key={i}>
                    <div className='song__action'>
                        <button onClick={() => handleClick(song)}>
                            <i className='fa-solid fa-circle-play'></i>
                        </button>
                    </div>
                    <div className='song__data'>
                        <div className='song__container'>
                            <span className='song__title'>{song.title}</span>
                        </div>

                        <div className='song__info'>
                            <span className='song__artist'>{song.artist}</span>
                        </div>
                    </div>
                    {/* <div className="song__options">
            <i className="fa-solid fa-ellipsis-vertical" />
          </div> */}
                </li>
            ))}
        </ul>
    )
}

export default {
    title: 'Músicas',
    component: SongList,
}
