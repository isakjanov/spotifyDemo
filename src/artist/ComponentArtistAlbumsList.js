import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'
import GridView from 'react-native-grid-view'
import SpotifyApi from '../resources/SpotifyApi'


export default class ComponentArtistAlbumsList extends Component {
  constructor(props) {
    super(props)
    this.spotifyApi = new SpotifyApi(this.props.authToken);
  }

  render() {
    return(
      <View style={ styles.container }>
        { this.displayProgress() }
        { this.displayError() }
        { this.displayAccessError() }

        <GridView
          items={this.props.albums}
          itemsPerRow={2}
          renderItem={this.renderAlbumItem.bind(this)}
          style={ styles.gridView }
          enableEmptySections={true}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }

  renderAlbumItem(album) {
    return (
      <View style={styles.album} key={album.id}>
        <TouchableHighlight onPress={()=>{
          this.props.onAlbumClicked(album.id, album.uri, this.props.player)
        }} underlayColor='#f5a2b7'>
          <Image source={{uri: album.images[1].url}} style={styles.cover} >
            {this.displayPlayBtn(album.id)}
          </Image>
        </TouchableHighlight>
        <Text style={styles.name} >
          {album.name}
        </Text>
      </View>)
  }


  displayProgress() {
    if (this.props.isAlbumsFetching) {
      return <Text>Loading...</Text>
    }
  }

  displayError() {
    if (this.props.albumsFetchingError !== '') {
      return <Text>Error: {this.props.albumsFetchingError}</Text>
    }
  }

  displayAccessError() {
    if (!this.props.player.isAuthenticating && !this.props.player.isPremium) {
      return <Text style={styles.notification}>You need premium account to play tracks</Text>
    }
  }

  //TODO: refactoring
  displayPlayBtn(albumId) {
    // hide controlls if not premium
    if (!this.props.player.isPremium) {
      return null
    }

    if (albumId === this.props.player.currentAlbumId) {
      if (this.props.player.isPlaying) {
        return <View><Image source={require('../res/img/ic_pause.png')} style={styles.controlls} /></View>
      } else if (this.props.player.isPause) {
        return <View><Image source={require('../res/img/ic_play.png')} style={styles.controlls} /></View>
      } else {
        // user action is processing
        //TODO: display preloader
        return null
      }
    }

    // show play btn default
    return <View><Image source={require('../res/img/ic_play.png')} style={styles.controlls} /></View>
  }

  componentDidMount() {
    this.props.onAlbumsLayoutDisplayed(this.spotifyApi, this.props.artistId)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  gridView: {
  },
  album:  {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  cover: {
    width: 120,
    height: 120,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlls: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: 'transparent',
    marginTop: 10
  },
  notification: {
    backgroundColor: '#FF9800',
    color: '#ffffff',
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4    
  }
})

ComponentArtistAlbumsList.propTypes = {
  authToken: React.PropTypes.string.isRequired,
  artistId: React.PropTypes.string.isRequired,
  isAlbumsFetching: React.PropTypes.bool.isRequired,
  albumsFetchingError: React.PropTypes.string.isRequired,
  albums: React.PropTypes.array.isRequired,
  player: React.PropTypes.object.isRequired,
  onAlbumsLayoutDisplayed: React.PropTypes.func.isRequired,
  onAlbumClicked: React.PropTypes.func.isRequired,
}
