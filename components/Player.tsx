import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import CircularProgress from '@mui/material/CircularProgress';
import { FaPlay } from 'react-icons/fa'
import { PlusIcon, CheckIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, PauseIcon } from '@heroicons/react/outline'
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { movieState } from '../atoms/modalAtoms';
import useAuth from '../hooks/useAuth';
import { db } from '../lib/firebase';
import toast, { Toaster } from 'react-hot-toast'
import { Movie } from '../typings';
import Tudum from './Tadum'

interface Props {
    trailer: string
  }

  const toastStyle = {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

function Player({ trailer}: Props) {
    const [movie, setMovie] = useRecoilState(movieState)
    const [play, setPlay] = useState(false)
    const [playTadum, setPlayTadum] = useState(false)

    const [pause, setPause] = useState(true)
    const [loading, setLoading] = useState(true)
    const [muted, setMuted] = useState(false)
    const { user } = useAuth()
    const [addedToList, setAddedToList] = useState(false)
    const isMounted = useRef(false)
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])

  // play tadum sound
  useEffect(() => {
    if (play === false) return
    if (play === true) setPlayTadum(true)

    return(() => {
      setPlayTadum(false)
    })
  }, [play])

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  // Check if the movie is already in the user's list // returns true if its found, returns false otherwise 
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  )

    const handleList = async () => {
        if(addedToList) {
          await deleteDoc(
            doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
          )

          toast(`${movie?.title || movie?.original_name} has been removed from My List`,
          {
            duration: 7000, style: toastStyle 
          }
        )
      } else {
        await setDoc(
          doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
          {...movie}
         )

         toast(`${movie?.title || movie?.original_name} has been added to My List`,
         {
          duration: 7000, style: toastStyle 
         }
       )
      }
    }

    useEffect(() => { 
      if (isMounted.current) return 
      isMounted.current = true

    },[])

  return (
    <div className="relative pt-[56.25%]">
      <Toaster position="bottom-center" />
    <ReactPlayer
        playing={play}
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: '0', left: '0' }}
        muted={muted}
        onReady={() => setLoading(false)}
        onBuffer={(() => {
          setLoading(false)
          setPause(false)
          })
        }
        onEnded={() => {
          setPlay(false)
          setPause(false)
        }}
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
            { !play && pause && !loading &&
                <>
                  <FaPlay className="mt-1 text-black h-7 w-11" /> 
                  Play
                </>
            }
            
            {/* display pause */}
            { play && !pause && !loading &&
                <>  
                  <PauseIcon className="mt-1 text-black h-7 w-7" />
                  Pause
                </>
            }

            {playTadum && <Tudum />}
                
             {/* display loading  */}
            { loading &&
              <>
                <div className='flex items-center justify-between w-24 font-normal'>
                <div className='-ml-3'>Loading...</div> 
                <CircularProgress size={20} thickness={5} className="!text-black -mr-3" /> 
                </div>
              </>

            }
        </button>
        <button
         onClick={handleList}
         className="modalButton" 
        >
          {
            addedToList ? (
              <CheckIcon className="h-7 w-7" />
            ) : (
              <PlusIcon className="h-7 w-7" />
            )
          }
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