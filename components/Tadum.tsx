import React, { useEffect, useRef } from 'react'
const TADUM_SOUND_URL = 'https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3'

function Tadum() {
	const soundRef = useRef<any>(null);
	const handleTadum = ():any => {
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

  useEffect(() => {
		handleTadum();
	}, [])
  return (
   <div className='PlayAnimation__wrp'>
    <audio ref={soundRef} src={TADUM_SOUND_URL} />
  </div>
  )
}

export default Tadum