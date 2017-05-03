import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#352144'
  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch"
  },
  logo: {
    height: 70,
    width: 70,
    marginTop: 30,
    resizeMode: 'contain'
  },
  logout: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 12,
    marginRight: 24
  }

})
