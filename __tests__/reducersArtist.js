import artist from '../src/artist/ReducersArtist'
import {
  selectArtist,
  startFetchAlbums,
  fetchAlbumsError,
  fetchAlbumsSuccess,
  startAuthPlayer,
  successAuthPlayer,
  failAuthPlayer,
  selectAlbum,
  playAlbum,
  pauseAlbum} from '../src/artist/ActionsArtist'

describe('artist reducer', () => {

  it('should return initial state', () => {
    expect(artist(undefined, {})).toEqual(
      {
          item: {},
          isAlbumsFetching: false,
          albumsFetchingError: '',
          albums: [],
          player: {
            isAuthenticating: false,
            isPremium: false,
            currentAlbumId: '',
            isPlaying: false,
            isPause: false,
          }
      }
    )
  })

  it ('should handle SELECT_ARTIST', () => {
    let artistObj = { name: 'validArtist' }
    let selectArtistAction = selectArtist(artistObj)

    expect(artist(undefined, selectArtistAction))
      .toEqual({
        item: artistObj,
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle FETCH_ALBUMS_START', () => {
    let fetchAlbumsStartAction = startFetchAlbums()

    expect(artist(undefined, fetchAlbumsStartAction))
      .toEqual({
        item: {},
        isAlbumsFetching: true,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle FETCH_ALBUMS_ERROR', () => {
    expect(artist(undefined, fetchAlbumsError("test error")))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: 'test error',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle FETCH_ALBUMS_SUCCESS', () => {
    let albums = {items: [{album: 'successAlbum'}]}
    expect(artist(undefined, fetchAlbumsSuccess(albums)))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [{album: 'successAlbum'}],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle START_AUTH_PLAYER', () => {
    expect(artist(undefined, startAuthPlayer()))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: true,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle SUCCESS_AUTH_PLAYER', () => {
    expect(artist(undefined, successAuthPlayer()))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: true,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle FAIL_AUTH_PLAYER', () => {
    expect(artist(undefined, failAuthPlayer()))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle SELECT_ALBUM', () => {
    expect(artist(undefined, selectAlbum('albumId')))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: 'albumId',
          isPlaying: false,
          isPause: false,
        }
      })
  })

  it ('should handle PLAY_ALBUM', () => {
    expect(artist(undefined, playAlbum()))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: true,
          isPause: false,
        }
      })
  })

  it ('should handle PAUSE_ALBUM', () => {
    expect(artist(undefined, pauseAlbum()))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [],
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: true,
        }
      })
  })

})
