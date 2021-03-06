import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { WebBrowser, Permissions, Location, TaskManager } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import store from '../../store'

import Status from './Status'

import { MonoText } from '../../components/StyledText'
import { DENIED, GRANTED, GRANTED_IN_USE, WAIT, BACKGROUND_UPDATE, BACKGROUND_GEOFENCE } from '../Constants'

TaskManager.defineTask(BACKGROUND_UPDATE, async ({ data: { locations }, error }) => {
  store.set('locations', [
    ...store.get('locations', []),
    ...locations.map(v => v.coords)
  ])
})

TaskManager.defineTask(BACKGROUND_GEOFENCE, ({ data: { eventType, region }, error }) => {
  const inMoscow = region.identifier === 'moscow' && eventType === Location.GeofencingEventType.Enter

  store.set('inMoscow', inMoscow)
})

class Loc extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    permissionStatus: WAIT,
    inMoscow: false,
  }

  componentDidMount = () => {
    this.askLocationPermission()
    this.startBackgroundUpdate()
    this.listeningToMoscow()

    this.unsubscribe = store.subscribe(
      "inMoscow",
      (inMoscow) => this.setState({ inMoscow }),
    )
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }
  
  askLocationPermission = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION)

    switch (status) {
      case 'granted':
        if (Platform.OS === 'ios') {
          const { scope } = permissions.location.ios

          this.setState({
            permissionStatus: scope === 'always' ? GRANTED : GRANTED_IN_USE,
          })
        } else {
          this.setState({ permissionStatus: GRANTED })
        }
        break
      case 'denied':
      default:
        this.setState({ permissionStatus: DENIED })
        break
    }
  }

  startBackgroundUpdate = () => {
    Location.startLocationUpdatesAsync(BACKGROUND_UPDATE, { accuracy: Location.Accuracy.Low })
  }

  listeningToMoscow = () => {
    Location.startGeofencingAsync(BACKGROUND_GEOFENCE, [
      {
        identifier: 'moscow',
        latitude: 55.755786,
        longitude: 37.617633,
        radius: 40,
        notifyOnEnter: true,
        notifyOnExit: true,
      }
    ])
  }

  render() {
    const { permissionStatus, inMoscow }  = this.state

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../../assets/images/robot-dev.png')
                : require('../../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <Status permissionStatus={permissionStatus} />

        {inMoscow && <Text style={styles.welcomeText} >Welcome to Moscow</Text>}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  welcomeText: {
    textAlign: 'center',
    marginTop: 50,
  },
})

export default Loc
