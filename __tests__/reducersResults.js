import artists from '../src/results/ReducersResults'
import {
  startFetchProcess,
  fetchArtistsError,
  fetchArtistsSuccess
} from '../src/results/ActionsResults'

describe('results reducer', () => {

  it('should handle RESULTS_FETCH_ARTISTS_START', () => {
    expect(artists(undefined, startFetchProcess()))
      .toEqual({
          isFetching: true,
          error: '',
          items: [],
          total: 0
        })
  })

  it('should handle RESULTS_FETCH_ARTISTS_ERROR', () => {
    let _error = 'error'
    expect(artists(undefined, fetchArtistsError(_error)))
      .toEqual({
        isFetching: false,
        error: _error,
        items: [],
        total: 0
      })
  })

  it('should handle RESULTS_FETCH_ARTISTS_SUCCESS', () => {
    let _artists = {artists: {items:[{name: 'valid artist'}], total: 1}}
    expect(artists(undefined, fetchArtistsSuccess(_artists)))
      .toEqual({
        isFetching: false,
        error: '',
        items: [ {name: 'valid artist'} ],
        total: 1
      })
  })
})
