import { connect } from 'react-redux'
import ComponentAuthorization from './ComponentAuthorization'
import { setToken, setError } from './ActionsAuthorization'


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    token: state.auth.token,
    platform: state.platform,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTokenReceived: (token) => {
      dispatch(setToken(token))
    },

    onAuthError: (error) => {
      dispatch(setError(error))
    }
  }
}

const ContainerAuthorization = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentAuthorization)

export default ContainerAuthorization
