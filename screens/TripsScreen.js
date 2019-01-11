import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'expo'

import store from '../store'
import useStore from '../store/useStore'

const TripsScreen = () => {
  const locations = useStore('locations') || []

  return (
    <MapView style={styles.container}>
      {locations.map((coord, i) => (
        <MapView.Marker key={i} coordinate={coord} />
      ))}
    </MapView>
  )
}

TripsScreen.navigationOptions = {
  title: 'Trips',
}

export default TripsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
