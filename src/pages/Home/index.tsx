import Layout from '../../components/Layout'
import Tabs from '../../components/Tabs'
import { Link } from 'react-router-dom'
import usePlayer from '../../store/usePlayer'
import FloatingPlayer from '../../components/FloatingPlayer'
import { useEffect, useState } from 'react'

function Home() {
    const { playing, paused, playlist } = usePlayer()
    const [floatingPlayerVisible, setFloatingPlayerVisible] = useState(false)

    useEffect(() => {
        if (playing || playlist.length) setFloatingPlayerVisible(true)
        else setFloatingPlayerVisible(false)
    }, [playing, paused])

    return (
        <>
            <Layout>
                <header className='header'>
                    {/* <div className={`btn btn--circle playing-now playing--${playing}`}>
            <button
              onClick={() => navigate('/tocando-agora')}
              // disabled={!playing}
            >
              <i className="fa-solid fa-music"></i>
            </button>
          </div> */}
                    <h3 className='header__logo'>SONARIUM</h3>
                    <div className='btn btn--circle'>
                        <Link to='/configuracao'>
                            <i className='fa-solid fa-gear'></i>
                        </Link>
                    </div>
                </header>
                <Tabs />
            </Layout>
            {floatingPlayerVisible && <FloatingPlayer />}
        </>
    )
}

export default Home
