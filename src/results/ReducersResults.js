"use strict"

const artists = (state = {
    isFetching: false,
    error: '',
    items: [],
    total: 0
  }, action) => {
  switch (action.type) {
    case 'RESULTS_FETCH_ARTISTS_START':
      return Object.assign({}, state, { isFetching: true, error: '' })
    case 'RESULTS_FETCH_ARTISTS_ERROR':
      return Object.assign({}, state, { isFetching: false, error: action.error })
    case 'RESULTS_FETCH_ARTISTS_SUCCESS':
      return Object.assign({}, state, { isFetching: false, error: '', items: action.artists.items, total: action.artists.total })
    default:
      return state
  }
}

export default artists
