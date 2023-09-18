import { createContext, useEffect, useState } from 'react'

const audio = new Audio()

const NO_REPEAT = 0
const REPEAT_ONE = 1
const REPEAT_ALL = 2
const repeatState = [NO_REPEAT, REPEAT_ONE, REPEAT_ALL]

let playlistPos = 0
const playlist: any = []

export const PlayerContext = createContext({
    playAt: (pos: number) => {
        pos
    },
    stop: () => {},
    playing: false,
    paused: false,
    shuffle: false,
    repeat: NO_REPEAT,
    togglePlay: () => {},
    toggleShuffle: () => {},
    toggleRepeat: () => {},
    addToPlaylist: (song: any) => {
        song
    },
    seekTime: (pos: number) => {
        pos
    },
    previousSong: () => {},
    nextSong: () => {},
    currentTime: 0,
    duration: 0,
    currentSong: {},
    playAllowed: false,
    forwardAllowed: false,
    backwardAllowed: false,
    playlist: [],
    currentPos: 0,
    toggleUpdateAllowed: () => {},
    setToPlaylist: (songs: any) => {
        songs
    },
})

function PlayerProvider(props: any) {
    const [playing, setPlaying] = useState(false)
    const [paused, setPaused] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(NO_REPEAT)

    const [playAllowed, setPlayAllowed] = useState(false)
    const [forwardAllowed, setForwardAllowed] = useState(false)
    const [backwardAllowed, setBackwardAllowed] = useState(false)

    const [currentSong, setCurrentSong]: any = useState()

    const [updateStatesAllowed, setUpdateStatesAllowed] = useState(true)

    const togglePause = () => setPaused(!paused)

    const toggleRepeat = () => setRepeat(repeatState[repeat + 1] || NO_REPEAT)

    const toggleShuffle = () => {
        setShuffle(!shuffle)
    }

    function togglePlay() {
        if (!playing && !paused && playlist.length) {
            play()
        } else if (playing && paused) {
            togglePause()
            audio.play()
        } else if (playing && !paused) {
            togglePause()
            audio.pause()
        }
    }

    const toggleUpdateAllowed = () => {
        setUpdateStatesAllowed(!updateStatesAllowed)
    }

    const seekTime = (pos: number) => (audio.currentTime = pos)

    const play = () => {
        const { file } = playlist[playlistPos]

        loadFile(file)
    }

    const playAt = (pos: number) => {
        playlistValue(pos)

        play()
    }

    const stop = () => {
        setCurrentSong(null)
        disableControls()
        playlistReset()
        resetStates()
        audio.src = ''
    }

    const loadFile = (file: any) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            const { result }: any = e.target

            audio.src = result
            audio.load()
        }
    }

    const disableControls = () => {
        setPlayAllowed(false)
        setBackwardAllowed(false)
        setForwardAllowed(false)
    }

    function resetStates() {
        setCurrentTime(0)
        setDuration(0)
        setPaused(false)
    }

    const addToPlaylist = (file: any) => {
        playlist.push(file)
        setPlayAllowed(playlist.length > 0)
    }

    const playlistNext = () => {
        playlistPos++
    }
    const playlistPrev = () => {
        playlistPos--
    }
    const playlistValue = (pos: number) => {
        playlistPos = pos
    }
    const playlistReset = () => {
        playlistValue(0)
    }

    const setToPlaylist = (songs: any) => {
        playlistReset()
        while (playlist.length > 0) playlist.pop()

        songs.forEach((song: any) => addToPlaylist(song))

        play()
    }

    const isLastSong = (pos: number) => pos === playlist.length

    const stopPlaying = () => {
        resetStates()
        playlistReset()
        setPlaying(false)
    }

    // const playRandom = () => {
    //   resetStates()
    //   const newRandomPos = Math.floor(Math.random() * playlist.length)
    //   playlistValue(newRandomPos)
    //   play()
    // }

    const repeatPlaylist = () => {
        resetStates()
        playlistValue(0)

        play()
    }

    const previousSong = () => {
        resetStates()
        playlistPrev()
        play()
    }

    const nextSong = () => {
        resetStates()
        playlistNext()
        play()
    }

    const handlePause = () => {
        // console.log('event pause')
        setPaused(true)
    }

    const handleReadytoPlay = () => {
        // Now the audio is ready to be played
        audio.play()
        setBackwardAllowed(playlistPos - 1 >= 0 ? true : false)
        setForwardAllowed(playlistPos + 1 < playlist.length ? true : false)

        setPlaying(true)
        setPaused(false)
        setPlayAllowed(true)

        document.title = playlist[playlistPos].title

        setCurrentSong(() => playlist[playlistPos])
    }

    const handleTimeUpdate = () => {
        if (updateStatesAllowed) {
            const time = Math.trunc(audio.currentTime)

            if (time !== currentTime) setCurrentTime(time)
        }
    }

    const handleLoadedMetadata = (e: any) => {
        const { duration }: any = e.target

        setDuration(
            duration && !isNaN(duration) && isFinite(duration) ? duration : 0
        )
    }

    const handleLastSong = () => {
        document.title = 'SONARIUM'
        disableControls()
        resetStates()

        const newPlaylistPosition = playlistPos + 1

        if (repeat === REPEAT_ALL && isLastSong(newPlaylistPosition))
            repeatPlaylist()
        if (newPlaylistPosition < playlist.length) nextSong()
        else stopPlaying()
    }

    useEffect(() => {
        audio.addEventListener('pause', handlePause)

        audio.addEventListener('canplay', handleReadytoPlay)

        audio.addEventListener('timeupdate', handleTimeUpdate)

        audio.addEventListener('loadedmetadata', handleLoadedMetadata)

        audio.addEventListener('ended', handleLastSong)

        return () => {
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('canplay', handleReadytoPlay)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('ended', handleLastSong)
        }
    }, [audio, playlist, playlistPos, updateStatesAllowed])

    const context = {
        togglePlay,
        playAt,
        stop,
        playing,
        paused,
        shuffle,
        repeat,
        toggleShuffle,
        toggleRepeat,
        currentTime,
        duration,
        addToPlaylist,
        seekTime,
        playAllowed,
        forwardAllowed,
        backwardAllowed,
        currentSong,
        previousSong,
        nextSong,
        playlist,
        currentPos: playlistPos,
        toggleUpdateAllowed,
        setToPlaylist,
    }

    return (
        <PlayerContext.Provider value={context}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider
