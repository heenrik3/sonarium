import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import useLibrary from '../../store/useLibrary'
import { useEffect, useRef } from 'react'
import useTheme from '../../store/useTheme'
import toast from 'react-hot-toast'
import usePlayer from '../../store/usePlayer'

function Settings() {
    const { theme, toggleTheme, themePos } = useTheme()
    const { addToLibrary, updateLibraryCovers, eraseLibrary } = useLibrary()
    const { stop } = usePlayer()
    const folderInput = useRef<HTMLInputElement>(null)
    const singleInput = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: any) => {
        if (!e.target.files) return

        addToLibrary(Array.from(e.target.files))

        toast.success('Arquivos adicionados.')
    }

    const handleFolderUpload = () => {
        folderInput.current?.click()
    }

    const handleFileUpload = () => {
        singleInput.current?.click()
    }

    const handleToggleTheme = (pos: number) => {
        toggleTheme(pos)
    }

    const handleUpdateCovers = () => {
        updateLibraryCovers()
        toast.success('Biblioteca atualizada.')
    }

    const handleResetLibrary = () => {
        stop()
        eraseLibrary()
        toast.success('Biblioteca apagada.')
    }

    const hiddenInputs = [
        <input
            ref={folderInput}
            className='file'
            type='file'
            onChange={handleFileChange}
            style={{ display: 'none' }}
            key={0}
        />,

        <input
            ref={singleInput}
            type='file'
            accept='audio/mpeg'
            multiple={true}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            key={1}
        />,
    ]
    const toggles = [
        { title: 'Claro', icon: 'fa-solid fa-sun' },
        { title: 'Escuro', icon: 'fa-solid fa-moon' },
        { title: 'Tema do sistema', icon: '' },
    ]

    const toggleEl = toggles.map((t: any, i: number) => (
        <button
            className={`toggle ${themePos === i ? 'toggle--selected' : ''}`}
            onClick={() => handleToggleTheme(i)}
            key={i}
        >
            <span>{t.title}</span> {t.icon ? <i className={t.icon} /> : null}
        </button>
    ))

    useEffect(() => {
        if (folderInput.current) {
            folderInput.current.setAttribute('directory', '')
            folderInput.current.setAttribute('webkitdirectory', '')
        }
    }, [folderInput])

    return (
        <Layout>
            <div className={`settings settings--${theme}`}>
                <header className='settings__header'>
                    <div className='btn btn--circle'>
                        <Link to='/'>
                            <i className='fa-solid fa-caret-left'></i>
                        </Link>
                    </div>
                    <h1>Configurações</h1>
                </header>
                {hiddenInputs}

                <section className='settings__section'>
                    <h3>Biblioteca</h3>

                    <div className='settings__library'>
                        <button className='btn' onClick={handleFolderUpload}>
                            Adicionar pasta
                        </button>
                        <button className='btn' onClick={handleFileUpload}>
                            Adicionar músicas
                        </button>
                        <div className='btn'>
                            <button onClick={handleResetLibrary}>
                                Excluir tudo
                            </button>
                        </div>
                    </div>
                </section>

                <section className='settings__section'>
                    <h3>Tema</h3>
                    <div className='toggles'>{toggleEl}</div>
                </section>

                <section className='settings__section'>
                    <h3>Atualização</h3>
                    <span>
                        Atualize a biblioteca quando encontrar capas de album
                        faltantes
                    </span>
                    <div>
                        <button className='btn' onClick={handleUpdateCovers}>
                            Atualizar Biblioteca
                        </button>
                    </div>
                </section>

                <div className='copyright__container'>
                    <span className='copyright'>
                        SONARIUM © {new Date().getFullYear()}{' '}
                        <p
                            style={{
                                fontFamily: 'Pacifico, cursive',
                                fontSize: '16px',
                            }}
                        >
                            by henry
                        </p>
                    </span>
                </div>
            </div>
        </Layout>
    )
}

export default Settings
