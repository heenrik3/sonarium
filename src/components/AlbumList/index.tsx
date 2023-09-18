import useLibrary from '../../store/useLibrary'
import { UNKNOWN_ALBUM_COVER } from '../../utils'
import ListItem from '../ListItem'

function AlbumList() {
    const { albums }: any = useLibrary()

    if (!albums.length)
        return (
            <div className='container'>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    <span>Sem álbums</span> 💿
                </div>
            </div>
        )

    return (
        <ul className='list__container'>
            {albums.map((album: any, i: number) => {
                const data = {
                    to: `/album/${album.title}`,
                    img: album.cover || UNKNOWN_ALBUM_COVER,
                    title: album.title,
                }
                return <ListItem data={data} key={i} />
            })}
        </ul>
    )
}

export default {
    title: 'Álbuns',
    component: AlbumList,
}
