import { connect } from 'react-redux'
import ComponentArtist from './ComponentArtist'
import { authPlayer, destroyPlayer } from './ActionsArtist'

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    platform: state.platform,
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    onArtistScreenCreated: (token, platform) => {
      if (platform === 'android') {
        dispatch(authPlayer(token))
      }
    },

    onDestroyPlayer: (platform) => {
      if (platform === 'android') {
        dispatch(destroyPlayer())
      }
    }
  }
}

const ContainerArtist = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtist)

export default ContainerArtist
