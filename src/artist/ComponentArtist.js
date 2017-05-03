import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

import ContainerArtistInfo from './ContainerArtistInfo'
import ContainerArtistAlbumsList from './ContainerArtistAlbumsList'


import { styles } from './Styles'

export default class ComponentArtist extends Component {
  constructor(props) {
    super(props)
    this.props.onArtistScreenCreated(this.props.token, this.props.platform)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../res/img/background_search.png')} style={styles.background} />

        <View style={styles.navigation_bar}>
          <View style={styles.left_region} >
            <TouchableHighlight onPress={this.performBackPress.bind(this)} style={styles.back_btn_container} underlayColor="#f5a2b7">
              <Image source={require('../res/img/arrow_back.png')} style={styles.back_btn} />
            </TouchableHighlight>
          </View>
          <Text style={styles.navigation_title}>Albums</Text>
          <View style={styles.right_region} />
        </View>

        <ContainerArtistInfo />

        <ContainerArtistAlbumsList />
      </View>
    )
  }

  performBackPress() {
    this.props.onDestroyPlayer(this.props.platform)
    this.props.onBackPress()
  }
}

ComponentArtist.propTypes = {
  token: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
  onArtistScreenCreated: PropTypes.func.isRequired,
  onDestroyPlayer: PropTypes.func.isRequired,
}
