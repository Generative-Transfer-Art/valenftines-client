import { useEffect, useState } from 'react'

export default function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is Down
  const [keyPress, setKeyPress] = useState<boolean>(false)
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPress(true)
    }
  }
  // If released key is our target key then set to false
  function upHandler({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPress(false)
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return keyPress
}
