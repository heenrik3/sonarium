import { useEffect, useState } from 'react'
import usePlayer from '../../store/usePlayer'
import useLibrary from '../../store/useLibrary'
import { useNavigate } from 'react-router-dom'
import { UNKNOWN_ALBUM_COVER } from '../../utils'

function FloatingPlayer() {
    const {
        togglePlay,
        backwardAllowed,
        forwardAllowed,
        playAllowed,
        playing,
        paused,
        playlist,
        previousSong,
        nextSong,
        currentSong,
    } = usePlayer()

    const { getSongInfo } = useLibrary()
    const [song, setSong]: any = useState()

    const navigate = useNavigate()

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
        if (currentSong) setSong(getSongInfo(currentSong))
    }, [currentSong])

    if (!song) return

    return (
        <div className='fp'>
            <div className='fp__container'>
                <picture
                    className={`fp__picture ${
                        playing && !paused ? 'rotate' : ''
                    }`}
                    onClick={() => navigate('/tocando-agora')}
                >
                    <img
                        className='fp__img'
                        src={song?.album?.cover || UNKNOWN_ALBUM_COVER}
                    />
                </picture>

                <div
                    className='fp__display'
                    onClick={() => navigate('/tocando-agora')}
                >
                    <div className='fp__scrollable'>
                        <div className='fp__title'>{song?.title}</div>
                    </div>

                    <div className='fp__scrollable'>
                        <p className='fp__artist'>{song?.artist}</p>
                    </div>
                </div>

                <div className='fp__controls'>
                    <div
                        className={`backward ${
                            !backwardAllowed ? 'disabled' : ''
                        }`}
                    >
                        <button onClick={handleBackward}>
                            <i className='fa-solid fa-backward-step' />
                        </button>
                    </div>
                    <div
                        className={`play ${
                            !playAllowed || !playlist.length ? 'disabled' : ''
                        }`}
                    >
                        <button onClick={handleOnPlay}>
                            <i
                                className={`fa-solid fa-${
                                    playing && !paused ? 'pause' : 'play'
                                }`}
                            />
                        </button>
                    </div>
                    <div
                        className={`forward ${
                            !forwardAllowed ? 'disabled' : ''
                        }`}
                    >
                        <button onClick={handleForward}>
                            <i className='fa-solid fa-forward-step' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FloatingPlayer
