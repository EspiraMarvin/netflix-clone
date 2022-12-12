import { useEffect, useState } from 'react'

function useVideoEvents() {
  const [play, setPlay] = useState(false)
  const [playTadum, setPlayTadum] = useState(false)

  const [pause, setPause] = useState(true)
  const [loading, setLoading] = useState(true)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!play) return
    if (play && !muted) setPlayTadum(true)
  }, [play])

  return {
    play,
    setPlay,
    pause,
    setPause,
    playTadum,
    setPlayTadum,
    loading,
    setLoading,
    muted,
    setMuted,
  }
}

export default useVideoEvents
