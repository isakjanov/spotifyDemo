import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'

export default class ComponentSearchHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text style={{fontSize: 22}}>{this.props.text}</Text>
    )
  }
}

ComponentSearchHeader.propTypes = {
  text: PropTypes.string.isRequired
}
