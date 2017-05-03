
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SuperDuperMusicApp from './src/SuperDuperMusicApp'


export default class SuperDuperMusic extends Component {
  render() {
    return (
        <SuperDuperMusicApp platform='ios' />
      )
  }
}

AppRegistry.registerComponent('SuperDuperMusic', () => SuperDuperMusic);
