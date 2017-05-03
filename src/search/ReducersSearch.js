const query = ( state = '', action) => {
  switch (action.type) {
    case 'SEARCH_UPDATE_QUERY':
      return action.query
    default:
      return state
  }
}

export default query
