import React from 'react'
import { Text, StyleSheet } from 'react-native'

import useStore from '../../store/useStore'

const InMoscow = () => {
  const inMoscow = useStore('inMoscow') || false

  return inMoscow
    ? <Text style={styles.welcomeText}>Welcome to Moscow</Text>
    : <Text style={styles.welcomeText}>Not in Moscow</Text>
}

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'center',
    marginTop: 50,
  },
})

export default InMoscow
