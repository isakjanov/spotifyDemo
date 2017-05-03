const auth = (state = {
    token: '',
    error: ''
  }, action) => {
    switch (action.type) {
      case 'UPDATE_TOKEN':
        return Object.assign({}, state, { token: action.token, error: '' })
      case 'AUTHORIZATION_ERROR':
        return Object.assign({}, state, { token: '', error: action.error })
      default:
        return state
    }
}

export default auth
