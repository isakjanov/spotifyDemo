export const fetchArtists = (spotifyApi, query) => {
  return function(dispatch) {
    dispatch(startFetchProcess())
    return fetchArtistsList(spotifyApi, query)
      .then((response) => response.json())
      .then((json) => dispatch(fetchArtistsSuccess(json)))
      .catch((error) => dispatch(fetchArtistsError(error)))
  }
}

export const startFetchProcess = () =>  {
  return { type: 'RESULTS_FETCH_ARTISTS_START' }
}

export const fetchArtistsError = (error) => {
  return { type: 'RESULTS_FETCH_ARTISTS_ERROR', error}
}

export const fetchArtistsSuccess = (json) =>  {
  return { type: 'RESULTS_FETCH_ARTISTS_SUCCESS', artists: json.artists }
}


function fetchArtistsList(spotifyApi, query) {
  return spotifyApi.searchArtists(query)
}
