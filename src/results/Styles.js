import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231c2e'
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
  info_panel: {
    justifyContent: 'center',
    height: 70,
    borderBottomColor: '#5d5c61',
    borderBottomWidth: 1
  },
  info: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 16,
  }
})
