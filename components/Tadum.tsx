import React, { useEffect } from 'react'

function Tadum() {

    useEffect(() => {
        const sound = new Audio('https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3');
            const promise = sound.play();
    
            if (promise !== undefined) {
                promise.then(() => {}).catch(error => console.error(error));
            }
      },[])
    
      function play() {
        var audio: any = document.getElementById('a1');
        console.log('audio id gotten', audio)
        audio.play();
      }

  return (
    <div>
        Tadum
        <audio id='a1'>
          <source src='./utils/TaDum.mp3' type='audio/mpeg' />
          <div className='z-50 text-white'>
          Your browser does not support the audio element.
          </div>
        </audio>

    </div>
  )
}

export default Tadum