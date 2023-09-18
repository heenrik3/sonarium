import { useEffect, useRef, useState } from 'react'
import ArtistList from '../ArtistList'
import SongList from '../SongList'
import AlbumList from '../AlbumList'
import useTheme from '../../store/useTheme'

function Tabs() {
  const tabs = [AlbumList, SongList, ArtistList]

  const navRef: any = useRef()
  const [currentTab, setCurrentTab] = useState(0)
  const [selectedTabWidth, setSelectedTabWidth] = useState('')
  const [selectedTabLeft, setSelectedTabLeft] = useState('')

  const { theme } = useTheme()

  function moveIndicator(el: any) {
    setSelectedTabLeft(el.offsetLeft - 20 + 'px')
    setSelectedTabWidth(el.offsetWidth + 'px')
  }

  function adjustIndicator() {
    if (navRef.current) {
      const tabsEl = Array.from(navRef.current.children)

      tabsEl.forEach(
        (tab: any) =>
          tab.classList.contains('tab--active') && moveIndicator(tab)
      )
    }
  }

  useEffect(() => {
    window.addEventListener('resize', adjustIndicator)
    adjustIndicator()
  }, [navRef, adjustIndicator])

  function handleActiveTab(e: any, index: number) {
    moveIndicator(e.target)

    setCurrentTab(index)
  }

  const Component = tabs[currentTab].component

  return (
    <>
      <div className={`tabs tabs--${theme}`}>
        <nav className="tabs__nav" ref={navRef}>
          {tabs.map((tab: any, i: number) => (
            <button
              className={`tab ${
                currentTab === i ? 'tab--active' : ''
              } ${theme}`}
              onClick={(e) => handleActiveTab(e, i)}
              key={i}
            >
              <span>{tab.title}</span>
            </button>
          ))}
        </nav>

        <div className="tabs__indicator">
          <span
            className="line"
            style={{ width: selectedTabWidth, left: selectedTabLeft }}
          >
            &nbsp;
          </span>
        </div>
      </div>
      <main className="tabs__content">{<Component />}</main>
    </>
  )
}

export default Tabs
