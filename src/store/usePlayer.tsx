import { useContext } from 'react'
import { PlayerContext } from './player-context'

const usePlayer = () => useContext(PlayerContext)

export default usePlayer
