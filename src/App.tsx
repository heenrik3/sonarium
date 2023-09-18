import RoutesApp from './routes'
import LibraryProvider from './store/library-context'
import PlayerProvider from './store/player-context'
import ThemeProvider from './store/theme-context'
import './style/main.sass'

function App() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <LibraryProvider>
          <RoutesApp />
        </LibraryProvider>
      </PlayerProvider>
    </ThemeProvider>
  )
}
export default App
