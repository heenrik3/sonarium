export const UNKNOWN_ALBUM_COVER = '/vinyl.jpg',
    UNKNOWN_ARTIST_COVER = '/mic.jpg'

export const parseTime = (time: number) => {
    var hours = Math.floor(time / 60 / 60)

    var minutes = Math.floor(time / 60) - hours * 60

    // 42
    var seconds = Math.trunc(time % 60)

    return (
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0')
    )
}

export async function extractAlbumCover(picture: any) {
    const data = picture.data
    const format = picture.format
    let base64String = ''
    for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i])
    }

    return `data:${format};base64,${window.btoa(base64String)}`
}
