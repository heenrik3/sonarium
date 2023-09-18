import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  theme: '',
  toggleTheme: (pos: number) => {
    pos
  },
  themePos: 0,
})
const preference = window.matchMedia('(prefers-color-scheme: dark)')
const getSystemTheme = () => Number(preference.matches)
const storeTheme = (pos: number) => {
  const currentTheme = {
    pos,
  }

  localStorage.setItem('theme', JSON.stringify(currentTheme))
}

const getTheme = () => {
  const storage = localStorage.getItem('theme')

  return storage ? JSON.parse(storage) : { pos: 0 }
}

function ThemeProvider(props: any) {
  const themes = ['light', 'dark']
  const [themePos, setThemePos] = useState(0)
  const [theme, setTheme] = useState('')

  const toggleTheme = (pos: number) => {
    setThemePos(pos)

    setTheme(themes[pos] || themes[getSystemTheme()])

    storeTheme(pos)
  }

  const handleSystemThemeChanged = (e: any) => setTheme(themes[+e.matches])

  useEffect(() => {
    const { pos } = getTheme()

    setThemePos(pos)

    setTheme(themes[pos] || themes[getSystemTheme()])

    preference.addEventListener('change', handleSystemThemeChanged)
  }, [setThemePos, preference])

  const context = {
    theme,
    toggleTheme,
    themePos,
  }

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
