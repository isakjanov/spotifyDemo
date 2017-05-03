import { connect } from 'react-redux'
import { updateSearchQuery } from './ActionsSearch'
import ComponentSearchQueryInput from './ComponentSearchQueryInput'


const mapStateToProps = (state) => {
  return {
    query: state.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQueryInputChange: (text) => {
      dispatch(updateSearchQuery(text))
    }
  }
}

const ContainerSearchQueryInput = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentSearchQueryInput)

export default ContainerSearchQueryInput
