import { connect } from 'react-redux'
import ComponentArtistAlbumsList from './ComponentArtistAlbumsList'
import { fetchArtistAlbums, startPlayAlbum, startPauseAlbum } from './ActionsArtist'

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    artistId: state.artist.item.id,
    isAlbumsFetching: state.artist.isAlbumsFetching,
    albumsFetchingError: state.artist.albumsFetchingError,
    albums: state.artist.albums,
    activeAlbumId: state.artist.activeAlbumId,
    player: state.artist.player
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    onAlbumsLayoutDisplayed: (spotifyApi, artistId) => {
      dispatch(fetchArtistAlbums(spotifyApi, artistId))
    },

    onAlbumClicked: (albumId, uri, player) => {
      if (!player.isPremium) {
        return
      }

      if (player.currentAlbumId != albumId) {
        // start playing
        dispatch(startPauseAlbum())
        dispatch(startPlayAlbum(albumId, uri))
      }

      if (player.currentAlbumId == albumId) {
        if (player.isPlaying == true) {
          dispatch(startPauseAlbum())
        } else if (player.isPause == true) {
          // resume
          dispatch(startPlayAlbum(albumId, uri))
        }
      }

    }
  }
}

const ContainerArtistAlbumsList = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtistAlbumsList)

export default ContainerArtistAlbumsList
