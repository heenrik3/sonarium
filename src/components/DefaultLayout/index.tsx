import { Outlet } from 'react-router-dom'
import useTheme from '../../store/useTheme'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

function DefaultLayout() {
  const { theme } = useTheme()

  return (
    <Fragment>
      <div className={`app app--${theme}`}>
        <div className="app__container">
          <Outlet />
        </div>
        <Toaster />
      </div>
    </Fragment>
  )
}

export default DefaultLayout
