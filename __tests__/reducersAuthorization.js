import auth from '../src/authorization/ReducersAuthorization'
import { setToken, setError } from '../src/authorization/ActionsAuthorization'

describe('authorization reducer', () => {
  it ('should handle UPDATE_TOKEN', () => {
    let _token = 'validToken'
    expect(auth(undefined, setToken(_token)))
      .toEqual({
        token: _token,
        error: ''
      })
  })

  it ('shold handle AUTHORIZATION_ERROR', () => {
    let _error = 'error'
    expect(auth(undefined, setError(_error)))
      .toEqual({
        token: '',
        error: _error
      })
  })
})
