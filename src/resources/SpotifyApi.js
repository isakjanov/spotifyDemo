const SPOTIFY_URL = 'https://api.spotify.com/v1/'

export default class SpotifyApi {

  constructor(authToken, _fetch=null) {
    this.fetch = _fetch === null ? fetch : _fetch
    this.authToken = 'Bearer ' + authToken
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    }
  }

  static get spotifyUrl() {
    return SPOTIFY_URL
  }

  searchArtists(query) {
    let requestUrl = SPOTIFY_URL + 'search?q=' + query + '&type=artist'
    return this.fetch(requestUrl, {
      method: 'GET',
      headers: this.headers
    })
    .then((response) => this.processResponse(response))
  }

  fetchArtistsAlbums(artistId) {
    let requestUrl = SPOTIFY_URL + 'artists/' + artistId + '/albums?album_type=album&market=US'
    return this.fetch(requestUrl, {
      method: 'GET',
      headers: this.headers,
    })
    .then((response) => this.processResponse(response))
  }

  processResponse(response) {
    if (response.status !== 200) {
      throw response.statusText
    }
    return response
  }
}
