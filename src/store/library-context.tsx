import { createContext, useState } from 'react'
import { extractAlbumCover } from '../utils'

const { jsmediatags }: any = window

const acceptedFormats = ['audio/mpeg']

async function getAlbumCover(artist: string, title: string) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_LYRICS_API}artist=${artist}&song=${title}`
        )
        const data = await res.json()

        return data.data.cover
    } catch (error) {
        return null
    }
}

async function getArtistPicture(artistName: string) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_GENIUS_API}${artistName}`
        )

        const data = await res.json()

        return data.response.hits[0].result.primary_artist.image_url
    } catch (error) {
        console.log(error)
        return null
    }
}

export const LibraryContext = createContext({
    artists: [],
    songs: [],
    albums: [],
    addToLibrary: (files: any) => {
        files
    },
    getSongInfo: (song: any) => {
        song
    },
    getArtistInfo: (artist: string) => {
        artist
    },
    getDiscography: (artist: string) => {
        artist
    },
    getAlbum: (album: string) => {
        album
        return []
    },

    updateLibraryCovers: async () => {},
    eraseLibrary: () => {},
})

const artistsLib: any = [],
    albumsLib: any = [],
    songsLib: any = []

function LibraryProvider(props: any) {
    const [artists, setArtists]: any = useState([])
    const [songs, setSongs]: any = useState([])
    const [albums, setAlbums]: any = useState([])

    function updateSongs(newSong: any) {
        songsLib.push(newSong)
        setSongs(songsLib)
    }

    function updateArtists(newArtist: any) {
        artistsLib.push(newArtist)
        setArtists(artistsLib)
    }

    function updateAlbums(newAlbum: any) {
        albumsLib.push(newAlbum)
        setAlbums(albumsLib)
    }

    function getSongInfo(song: any) {
        const albumInfo = albumsLib
            .filter((album: any) => album.title === song.album)
            .pop()

        if (!albumInfo) return

        const songInfo: any = {
            title: song.title,
        }

        const album = {
            title: albumInfo.title,
            cover: albumInfo.cover,
        }

        if (albumInfo) {
            songInfo.artist = albumInfo.artist
            songInfo.album = album
        }

        return songInfo
    }

    const getArtistInfo = (artistName: string) => {
        const albums = albumsLib.filter(
            (album: any) => album.artist === artistName
        )

        const songs = songsLib.filter((song: any) => song.artist === artistName)

        const artist = artistsLib
            .filter((artist: any) => artist.name === artistName)
            .pop()

        const info: any = {
            albums,
            songs,
        }

        const { img } = artist

        if (img) info.img = img

        return info
    }

    const getDiscography = (artist: string) =>
        songsLib.filter((song: any) => song.artist === artist)

    const getAlbum = (albumName: string) => {
        const album: any = {
            tracks: songsLib.filter((song: any) => song.album === albumName),
        }

        const albumInfo = albumsLib
            .filter((album: any) => album.title === albumName)
            .pop()

        if (albumInfo) {
            album.cover = albumInfo.cover
            album.artist = albumInfo.artist
        }

        return album
    }

    async function readingTagSucceeded(file: any, tag: any) {
        const { title, album, artist, picture } = tag.tags

        const songInLibrary = songs.some((song: any) => {
            song.title === title || song.title === file.name
        })

        if (songInLibrary) return

        const songTitle = title || file.name
        const songArtist = artist || 'Desconhecido'
        const albumTitle = album || 'Desconhecido'

        const newSong = {
            title: songTitle,
            artist: songArtist,
            album: albumTitle,
            file,
            isSearchable: title && artist,
        }

        const newArtist = {
            name: songArtist,
            // img: albumCover,
        }

        const newAlbum: any = {
            artist: songArtist,
            title: albumTitle,
        }

        updateSongs(newSong)

        const artistExists = artistsLib
            .filter((artist: any) => artist.name === newArtist.name)
            .pop()

        if (!artistExists) updateArtists(newArtist)

        const albumExists = albumsLib
            .filter((album: any) => album.title === newAlbum.title)
            .pop()

        if (!albumExists) {
            if (picture) newAlbum.cover = await extractAlbumCover(picture)
            else if (title && artist) {
                const cover = await getAlbumCover(artist, title)

                if (cover) newAlbum.cover = cover
            }

            updateAlbums(newAlbum)
        }
    }

    function readingTagFailed(err: any) {
        console.log(err)
    }

    function addToLibrary(files: any) {
        // const folder: any = files?.[0].webkitRelativePath.split('/')[0]
        // if (folders.includes(folder)) return

        // setFolders((prev: any) => [...prev, folder])

        files.forEach((file: any) => {
            if (!acceptedFormats.includes(file.type)) return

            const callbacks = {
                onSuccess: (tag: any) => readingTagSucceeded(file, tag),

                onError: (err: any) => readingTagFailed(err),
            }

            jsmediatags.read(file, callbacks)
        })
    }

    const clearList = (list: any) => {
        while (list.length > 0) list.pop()
    }

    const updateLibraryCovers = async () => {
        artistsLib.forEach(async (artist: any) => {
            if (artist.img || artist.name === 'Desconhecido') return
            const cover = await getArtistPicture(artist.name)

            if (cover) artist.img = cover
        })
    }

    const eraseLibrary = () => {
        clearList(songsLib)
        clearList(artistsLib)
        clearList(albumsLib)
    }

    const context = {
        addToLibrary,
        artists,
        songs,
        albums,
        getSongInfo,
        getArtistInfo,
        getDiscography,
        getAlbum,
        updateLibraryCovers,
        eraseLibrary,
    }

    return (
        <LibraryContext.Provider value={context}>
            {props.children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider
