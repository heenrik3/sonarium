import usePlayer from '../../store/usePlayer'

function PlayBtn(props: any) {
    const { playing, paused } = usePlayer()

    return (
        <div className={`play-btn`}>
            <button onClick={props.handler}>
                <i
                    className={`fa-solid fa-${
                        playing && !paused ? 'pause' : 'play'
                    }`}
                />
            </button>
        </div>
    )
}

export default PlayBtn
