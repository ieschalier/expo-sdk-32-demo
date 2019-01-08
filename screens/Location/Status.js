import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { DENIED, GRANTED, GRANTED_IN_USE, WAIT } from '../Constants'

const styles = {
  container: {
    alignItems: 'center',
  }
}

const Status = ({ permissionStatus }) => {
  switch (permissionStatus) {
    case WAIT:
      return (
        <View style={styles.container}>
          <Text>Wait</Text>
        </View>
      )
    case GRANTED:
      return (
        <View style={styles.container}>
          <MaterialIcons name="location-on" size={60} color="#388e3c" />
          <Text style={{ color: '#388e3c' }}>Granted</Text>
        </View>
      )
    case GRANTED_IN_USE:
      return (
        <View style={styles.container}>
          <MaterialIcons name="location-off" size={60} color="#f57f17" />
          <Text style={{ color: '#f57f17' }}>Settings > App > Permissions > Location > always </Text>
        </View>
      )
    case DENIED:
    default:
      return (
        <View style={styles.container}>
        <MaterialIcons name="location-off" size={60} color="#7f0000" />
          <Text style={{ color: '#7f0000' }} >Denied</Text>
        </View>
      )
  }
}

export default Status
