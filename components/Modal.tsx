import React, { useEffect, useState, useRef } from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import { XIcon, PlusIcon, CheckIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, PauseIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'

interface trailerDetailsType {
  runtime: number | null
} 


function Modal() {
    const isMounted = useRef(false)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState('')
    const [trailerDetails, setTrailerDetails] = useState<trailerDetailsType | null>(null)
    const [genres, setGenres] = useState<Genre[]>([])
    const [play, setPlay] = useState(true)
    const [muted, setMuted] = useState(false)
    const [showMore, setShowMore] = useState(true)


    useEffect(() => {
      if (isMounted.current)  return 
      isMounted.current = true

        if(!movie) return


        async function fetchMovie() {
            
            const data =  await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                  }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                  }&language=en-US&append_to_response=videos`
            ).then(response => response.json())
            .catch(err => console.log('err at modal', err))
            
            if(data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
                setTrailer(data.videos?.results[index]?.key)
                setTrailerDetails(data)
            }

            if(data?.genres) {
              setGenres(data.genres)
            }
        }
        // console.log('trailer details runtime', trailerDetails?.runtime)

        fetchMovie()

    }, [movie])


    const handleClose = () => {
        setShowModal(false)
    } 
  


    let movieRuntime = trailerDetails?.runtime
    const movieLength = (movieRuntime: undefined|null|number): React.ReactNode => {
      if (movieRuntime) {
        let hours = Math.floor(movieRuntime/60)
        let mins = movieRuntime % 60
        
        const displayHours = (hours: number): React.ReactNode => {
          return hours > 0 ? <span>{ hours }hr</span> : ''
        }
        return (
          movieRuntime !== undefined && <div> {displayHours(hours)} {mins}mins </div>       
        ) 
      }
    
    }


  return (
    <MuiModal 
    open={showModal} 
    onClose={handleClose} 
    className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
        <>
         <button
           onClick={handleClose}
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]
            hover:bg-[#181818]"
         >
            <XIcon className="w-6 h-6" />
         </button>

         <div className="relative pt-[56.25%]">
          <ReactPlayer
              playing={play}
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              
              muted={muted}
            />

         <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
           <div className="flex space-x-2">
              <button
                 onClick={() => setPlay(!play)}
                 className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PauseIcon className="mt-1 text-black h-7 w-7" />
                {/* <FaPlay className="mt-1 text-black h-7 w-7" /> */}
                Play
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


         <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
               <div className="flex items-center space-x-2 text-sm">
                <p className='font-semibold text-green-400'>{movie!.vote_average * 10}% Match</p>
                <p className='font-light'>{ movie?.release_date || movie?.first_air_date }</p>
                {/* <p className='font-light'>{ format(new Date(movie?.release_date), 'yyyy') || format(new Date(movie?.first_air_date), 'yyyy')}</p> */}
                {/* <p className='font-light'>{ format(new Date(movie?.release_date) || new Date(movie?.first_air_date), 'yyyy')}</p> */}
                <p className="text-white">
                  {movie?.adult ? (
                      <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">18+</div>
                    ) : 
                    (
                      <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">R</div>
                    )
                  } 
                </p>
                <p className='hidden font-light md:inline'>
                  { movieLength(movieRuntime) }
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD 
                </div>
               </div>

               {/* movie overview/description */}
               <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
                 <p className="w-full md:w-5/6">
                  { showMore ? movie?.overview.slice(0, 160) : movie?.overview} {showMore && (<span> ... </span>)}
                   <button 
                     className={`${showMore && "showMoreLessButton"} 
                      ${!showMore &&  "showMoreLessButton ml-2"} `}
                     onClick={() => setShowMore(!showMore)}
                    >
                     { showMore ? (<span>Show more</span>) : (<span>Show less</span>) }
                   </button>
                 </p>
                 <div className='flex flex-col space-y-3 text-sm'>
                   <div>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map(genre => genre.name).join(',')}
                   </div>

                   <div>
                     <span className="text-[gray]">Original Language: </span>
                     {movie?.original_language}
                   </div>
                   
                   <div>
                    <span className="text-[gray]">Total Votes: </span>
                    {movie?.vote_count} 
                   </div>
          
                   
                 </div>
               </div>
            </div>
         </div>
        </>
    </MuiModal>
  )
}

export default Modal