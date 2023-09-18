import { useContext } from 'react'
import { LibraryContext } from './library-context'

const useLibrary = () => useContext(LibraryContext)

export default useLibrary
