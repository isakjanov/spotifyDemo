"use strict"

import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import ComponentResultsArtist from './ComponentResultsArtist'
import SpotifyApi from '../resources/SpotifyApi'

import { styles } from './Styles'

export default class ComponentResults extends Component {
  constructor(props) {
    super(props);
    this.spotifyApi = new SpotifyApi(this.props.authToken);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.artists)

    return (
      <View style={styles.container}>
        <View style={styles.navigation_bar}>
          <View style={styles.left_region} >
            <TouchableHighlight onPress={this.props.onBackPress} style={styles.back_btn_container} underlayColor="#f5a2b7">
              <Image source={require('../res/img/arrow_back.png')} style={styles.back_btn} />
            </TouchableHighlight>
          </View>
          <Text style={styles.navigation_title}>Results</Text>
          <View style={styles.right_region} />
        </View>

        <View style={styles.info_panel}>
          { this.drawProgress() }
          { this.drawError() }
          { this.drawResults() }
        </View>


        <ListView
          dataSource={dataSource}
          renderRow={
            (rowData) =>
              <ComponentResultsArtist artist={rowData} onRowClicked={() => this.processOnRowClicked(rowData)}/>
          }
          enableEmptySections={true}
          keyboardShouldPersistTaps="always"
        />
      </View>
    );
  }

  processOnRowClicked(artist) {
    this.props.onArtistSelected(artist)
    this.props.onSetArtistRoute()
  }

  componentDidMount() {
    this.props.onSceneCreated(this.spotifyApi, this.props.query)
  }

  drawProgress() {
    if (this.props.isFetching) {
      return <Text style={styles.info}>Loading...</Text>
    }
  }

  drawError() {
    if (this.props.error != '') {
      return <Text style={styles.info}>Error: {this.props.error}</Text>
    }
  }

  drawResults() {
    if (!this.props.isFetching && this.props.error == '') {
      return <Text style={styles.info}>{this.props.total} results related to {"\""}{this.props.query}{"\""}</Text>
    }
  }
}

ComponentResults.propTypes = {
  authToken: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onSceneCreated: PropTypes.func.isRequired,
  onSetArtistRoute: PropTypes.func.isRequired,
  onArtistSelected: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
}
