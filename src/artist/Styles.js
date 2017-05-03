import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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
  navigation_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#ea2859'
  },
  back_btn_container: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  back_btn: {
    width: 24,
    height: 24,
  },
  left_region: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right_region: {
    flex: 1
  },
  navigation_title: {
    color: '#ffffff',
    fontSize: 18,
    flex: 3,
    textAlign: 'center',
  },
});
