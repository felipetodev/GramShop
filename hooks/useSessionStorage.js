import { useState } from 'react'

export function useSessionStorage (key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      if (typeof value === 'function') {
        setValue(value(storedValue))
        window.sessionStorage.setItem(key, JSON.stringify(value(storedValue)))
      } else {
        setStoredValue(value)
        window.sessionStorage.setItem(key, JSON.stringify(value))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return [storedValue, setValue]
}
