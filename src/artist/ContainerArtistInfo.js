import { connect } from 'react-redux'
import ComponentArtistInfo from './ComponentArtistInfo'

const mapStateToProps = (state) => {
  return {
    images: state.artist.item.images,
    name: state.artist.item.name,
    genres: state.artist.item.genres
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {}
}

const ContainerArtistInfo = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtistInfo)

export default ContainerArtistInfo
