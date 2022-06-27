import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import CircularProgress from '@mui/material/CircularProgress';
import { FaPlay } from 'react-icons/fa'
import { XIcon, PlusIcon, CheckIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, PauseIcon } from '@heroicons/react/outline'

interface trailerProps {
    trailer: string
}

function Player({ trailer }: trailerProps) {
    const [play, setPlay] = useState(false)
    const [pause, setPause] = useState(false)
    const [loading, setLoading] = useState(true)
    const [muted, setMuted] = useState(false)

    useEffect(() => {
      console.log('watch play', play)
    }, [play])

  return (
    <div className="relative pt-[56.25%]">
    <ReactPlayer
        playing={play}
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: '0', left: '0' }}
        muted={muted}
        onEnded={() => {
          setPlay(false)
          setPause(false)
        } 
      }
        onReady={(() => setPlay(true))}
        onBuffer={(() => {
          setLoading(false)
          setPause(true)
        })
      }
      />

   <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
     <div className="flex space-x-2">
        <button
           onClick={() => {
            setPlay(!play)
            setPause(!pause)
          }}
           className="flex items-center gap-x-2 rounded bg-white px-5 md:px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
           >
            {/* display play */}
            { !play && !pause && !loading &&
                  (
                    <>
                      <FaPlay className="mt-1 text-black h-7 w-11" /> 
                    Play
                  </>
                  )
            }
            
            {/* display pause */}
            { play && pause && !loading &&
              (
                <>  
                  <PauseIcon className="mt-1 text-black h-7 w-7" />
                  Pause
                </>
              ) 
            
            }
                
             {/* display loading  */}
            { loading &&
              (
              <div className='w-20'>
                <CircularProgress size={25} thickness={4} className="!text-black !mt-1" /> 
              </div>
              ) 
            }
        </button>
        <button className="modalButton">
          <PlusIcon className="h-7 w-7" />
        </button>
        <button className="modalButton">
          <ThumbUpIcon className="w-6 h-6" />
        </button>
     </div>
     <button className="modalButton" onClick={() => setMuted(!muted)}>
      { muted  ?
        ( <VolumeOffIcon className="w-6 h-6" />)
          :
        (<VolumeUpIcon className="w-6 h-6" /> ) 
      }
     </button>
   </div>
   </div>

  )
}

export default Player