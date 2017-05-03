import SpotifyApi from "../src/resources/SpotifyApi"

describe("Spotify API", () => {
  let api
  let fetch

  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() => Promise.resolve({}))
    api = new SpotifyApi("my-secret-token", fetch)
  })

  it("processResponse should throw an error if response is null", () => {
    expect(() => {
      api.processResponse(null)
    }).toThrow()
  })

  it("processResponse should throw exception if status code is not OK", () => {
    expect(() => {
      api.processResponse({
        status: 400,
        statusText: "Some error"
      })
    }).toThrow()
  })

  it("processResponse should return correct response if status code is OK", () => {
    const validResponse = {
      status: 200,
      statusText: "OK",
      data: {}
    }
    response = api.processResponse(validResponse)
    expect(response).toEqual(validResponse)
  })

  it("searchArtists should generate correct request params", () => {
    artist = 'testArtist'
    api.searchArtists(artist)
    expect(SpotifyApi.spotifyUrl + 'search?q=' + artist + '&type=artist').toEqual(fetch.mock.calls[0][0])
  })

  it("fetchArtistsAlbums should generate correct request params", () => {
    artistId = 'testArtistId'
    api.fetchArtistsAlbums(artistId)
    expect(SpotifyApi.spotifyUrl + 'artists/' + artistId + '/albums?album_type=album&market=US')
      .toEqual(fetch.mock.calls[0][0])
  })
})
