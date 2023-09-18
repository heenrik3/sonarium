import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'

import DefaultLayout from '../components/DefaultLayout'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import PlayingNow from '../pages/PlayingNow'
import Artist from '../pages/Artist'
import Album from '../pages/Album'

const router = createBrowserRouter([{ path: '*', Component: Root }])

function Root() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tocando-agora" element={<PlayingNow />} />
        <Route path="/configuracao" element={<Settings />} />
        <Route path="/artista/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
      </Route>
    </Routes>
  )
}

function RoutesApp() {
  return <RouterProvider router={router} />
}

export default RoutesApp
