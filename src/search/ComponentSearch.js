import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

import { styles } from './Styles'

import ComponentSearchHeader from './ComponentSearchHeader'
import ContainerSearchQueryInput from './ContainerSearchQueryInput'

import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'


export default class ComponentSearch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bg_container}>
          <Image source={require('../res/img/background_search.png')} style={styles.background} />
        </View>

        <Text onPress={ this.props.onLogoutClick } style={styles.logout}>Log out</Text>

        <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={require('../res/img/logo.png')} style={styles.logo} />
        </View>

        <ContainerSearchQueryInput placeholder='Artist name' onRouteUpdated={()=>this.props.onSearchClick()} />
      </View>
    )
  }
}

ComponentSearch.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}
