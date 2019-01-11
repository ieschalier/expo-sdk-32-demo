import { useState, useEffect } from 'react'
import store from './index'

export default (key) => {
  const [value, setValue] = useState(store.get(key))

  const handleChange = (v) => setValue(v)

  useEffect(() => {
    const unsubscribe = store.subscribe(key, handleChange)

    return unsubscribe
  })

  return value
}
