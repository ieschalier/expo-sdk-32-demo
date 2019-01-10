import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'expo'

import store from '../store'

export default class TripsScreen extends React.Component {
  static navigationOptions = {
    title: 'Trips',
  }

  state = {
    locations: store.get('locations', []),
  }

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(
      'locations',
      (locations) => this.setState({ locations }),
    )
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  render() {
    const { locations } = this.state

    return (
      <MapView style={styles.container}>
        {locations.map((coord, i) => (
          <MapView.Marker key={i} coordinate={coord} />
        ))}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
