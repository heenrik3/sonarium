import { useContext } from 'react'
import { ThemeContext } from '../store/theme-context'

const useTheme = () => useContext(ThemeContext)

export default useTheme
