const artist = (state = {
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
}, action) => {
  switch(action.type) {
    case 'SELECT_ARTIST':
      return Object.assign({}, state, {
        item: action.artist,
        player: {
          isAuthenticating: false,
          isPremium: false,
          currentAlbumId: '',
          isPlaying: false,
          isPause: false,
        }
      })
    case 'FETCH_ALBUMS_START':
      return Object.assign({}, state, { isAlbumsFetching: true, albumsFetchingError: ''})
    case 'FETCH_ALBUMS_ERROR':
      return Object.assign({}, state, { isAlbumsFetching: false, albumsFetchingError: action.error })
    case 'FETCH_ALBUMS_SUCCESS':
      return Object.assign({}, state, { isAlbumsFetching: false, albumsFetchingError: '', albums: action.albums })
    case 'START_AUTH_PLAYER':
      return Object.assign({}, state, { player: {
        isAuthenticating: true,
        isPremium: false,
        currentAlbumId: '',
        isPlaying: false,
        isPause: false,
      }})
      return
    case 'SUCCESS_AUTH_PLAYER':
      return Object.assign({}, state, { player: {
        isAuthenticating: false,
        isPremium: true,
        currentAlbumId: '',
        isPlaying: false,
        isPause: false,
      }})
    case 'FAIL_AUTH_PLAYER':
      return Object.assign({}, state, { player: {
        isAuthenticating: false,
        isPremium: false,
        currentAlbumId: '',
        isPlaying: false,
        isPause: false,
      }})
    case 'SELECT_ALBUM':
      _player = Object.assign({}, state.player, {currentAlbumId: action.albumId, isPlaying: false, isPause: false})
      return Object.assign({}, state, { player: _player})
    case 'PLAY_ALBUM':
      _player = Object.assign({}, state.player, {isPlaying: true, isPause: false })
      return Object.assign({}, state, { player: _player})
    case 'PAUSE_ALBUM':
      _player = Object.assign({}, state.player, {isPlaying: false, isPause: true })
      return Object.assign({}, state, { player: _player})
    default:
      return state
  }
}

export default artist
