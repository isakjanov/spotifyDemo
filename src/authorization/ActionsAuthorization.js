export const setToken = (token) => {
  return { type: 'UPDATE_TOKEN', token }
}

export const setError = (error) => {
  return { type: 'AUTHORIZATION_ERROR', error}
}
