import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

export default class ComponentArtist extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.button}>Play</Text>
      </View>
    )
  }
}

ComponentArtist.propTypes = {
  token: PropTypes.string.isRequired
}

export const styles = StyleSheet.create({
  container: {
    flext: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#231c2e',
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius:50,
    fontSize: 24,
    color: '#ffffff',
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: '#ff245a',
  },
})
