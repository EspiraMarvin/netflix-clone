import React, { useEffect, useRef } from 'react'
const TADUM_SOUND_URL = 'https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3'


function Tadum() {

	// let history = useHistory();
	const soundRef = useRef<any>(null);
	const handleTadum = ():any => {
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

  useEffect(() => {
		handleTadum();
		setTimeout(() => {
			// history.push('/browse')
		}, 4200)
	}, [])
    // useEffect(() => {
    //     const sound = new Audio('https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3');
    //         const promise = sound.play();
    
    //         if (promise !== undefined) {
    //             promise.then(() => {}).catch(error => console.error(error));
    //         }
    //   },[])
    
      // function play() {
      //   var audio: any = document.getElementById('a1');
      //   console.log('audio id gotten', audio)
      //   audio.play();
      // }

  return (
   <div className='PlayAnimation__wrp'>
    <audio ref={soundRef} src={TADUM_SOUND_URL} />
  </div>
  )
}

export default Tadum