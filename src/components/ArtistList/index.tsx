import useLibrary from '../../store/useLibrary'
import { UNKNOWN_ARTIST_COVER } from '../../utils'
import ListItem from '../ListItem'

function ArtistList() {
    const { artists }: any = useLibrary()

    if (!artists.length)
        return (
            <div className='container'>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    <span>Sem artistas</span> 🎤
                </div>
            </div>
        )

    return (
        <ul className='list__container'>
            {artists.map((artist: any, i: number) => {
                const data = {
                    to: `/artista/${artist.name}`,
                    img: artist.img || UNKNOWN_ARTIST_COVER,
                    title: artist.name,
                }
                return <ListItem data={data} key={i} />
            })}
        </ul>
    )
}

export default {
    title: 'Artistas',
    component: ArtistList,
}
