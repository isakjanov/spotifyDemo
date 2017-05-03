/**
 * Import Libraries
 */
import React, { Component, PropTypes } from 'react'
import { AppRegistry, Navigator, BackAndroid, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


/**
 *  Import components
 */
import ContainerAuthorization from './authorization/ContainerAuthorization'
import ContainerResults from './results/ContainerResults'
import ComponentSearch from './search/ComponentSearch'
import ContainerArtist from './artist/ContainerArtist'
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator'


/**
 *  Import redusers
 */
import rootReducer from './ReducersApp'


/**
 *  Import actions
 */
import { updateSearchQuery } from './search/ActionsSearch'
import { setToken } from './authorization/ActionsAuthorization'
import { setPlatform } from './ActionsApp'


import Routes from './routes'
import SpotifyAuthModuleAndroid from './nativeModules/SpotifyAuthModuleAndroid'

let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


export default class SuperDuperMusicApp extends Component {
  constructor(props) {
    super(props)
    store.dispatch(setPlatform(this.props.platform))
    this.navigator


    /*
    let unsubscribe = store.subscribe(() => {
      console.log(store.getState())
    })
    */

    this.getLocalAuthToken()
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 2) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <Provider store={store} >
        <Navigator
          initialRoute={{ name: Routes.login }}
          renderScene={ this.renderScene.bind(this) }
          configureScene={(route, routeStack) => TRANSITION_NONE}
        />
      </Provider>
    )
  }

  renderScene(route, navigator) {
    if (this.navigator == null) {
      this.navigator = navigator
    }
    if (route.name == Routes.login) {
      return <ContainerAuthorization
                onAuthComplited={() => this.navigate(Routes.search)} />
    }
    if (route.name == Routes.search) {
      return <ComponentSearch
                onSearchClick={() => this.navigate(Routes.results)}
                onLogoutClick={() => this.logout()}/>
    }
    if (route.name == Routes.results) {
      return <ContainerResults
                onSetArtistRoute={() => this.navigate(Routes.artist)}
                onBackPress={this.navigator.pop}/>
    }
    if (route.name == Routes.artist) {
      return <ContainerArtist onBackPress={this.navigator.pop}/>
    }
  }

  navigate(route) {
    this.navigator.push({
      name: route,
    })
  }

  logout() {
    if (this.props.platform === 'android') {
      SpotifyAuthModuleAndroid.logOut()
    }
    AsyncStorage.removeItem('authToken')
      .then(() => {
        store.dispatch(setToken(''))
        this.navigate(Routes.login)
      })

  }

  getLocalAuthToken() {
    AsyncStorage.getItem('authToken')
      .then((value) => {
        if (!value) {
          this.navigate(Routes.login)
          return
        }
        store.dispatch(setToken(value))
        this.navigate(Routes.search)
      })
  }
}

// Hack to see network requests in chrome browser
const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;
XMLHttpRequest = _XHR;

const NoTransition = {
    opacity: {
        value: 1.0,
        type: 'constant',
    }
};

const TRANSITION_NONE = Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {
    gestures: null,
    defaultTransitionVelocity: 1000,
    animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition),
    },
});


SuperDuperMusicApp.propTypes = {
  platform: PropTypes.string.isRequired
}
