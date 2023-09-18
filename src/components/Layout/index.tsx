import { useEffect, useState } from 'react'

function Layout(props: any) {
  const [height, setHeight] = useState(`${window.innerHeight}px`)

  useEffect(() => {
    window.addEventListener('resize', () =>
      setHeight(`${window.innerHeight}px`)
    )
  }, [])

  return (
    <div className="layout" style={{ height }}>
      {props.children}
    </div>
  )
}

export default Layout
