import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'

export default class ComponentSearchQueryInput extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.search_btn_container}>
        <Text style={styles.message}>Type a singer you like and press search</Text>

        <TextInput style={styles.input}
          placeholder={this.props.placeholder}
          placeholderTextColor='#ea2859'
          underlineColorAndroid='#ea2859'
          onChangeText={this.props.onQueryInputChange} />

          <TouchableHighlight style={ styles.search_btn } onPress={this.search.bind(this)} underlayColor="#f5a2b7">
            <Text style={ styles.search_btn_text }>Search</Text>
          </TouchableHighlight>
        </View>
    )
  }

  search() {
    if (this.props.query != null && this.props.query !== '') {
      this.props.onRouteUpdated()
    } else {
      //ask user to fill input
    }
  }
}

const styles = StyleSheet.create({
  search_btn_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  search_btn: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius:50,
    alignSelf: 'stretch',
    backgroundColor: '#ff245a',
  },
    search_btn_text: {
    fontSize: 24,
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',

  },
  input: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 100,
    fontSize: 20,
    height: 60,
    color: '#ea2859',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  message: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    textAlign: 'center',
  }
})

ComponentSearchQueryInput.propTypes = {
  query: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onQueryInputChange: PropTypes.func.isRequired,
  onRouteUpdated: PropTypes.func.isRequired
}
