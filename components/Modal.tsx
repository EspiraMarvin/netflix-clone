import React, { useEffect, useState, useRef } from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import { XIcon, PlusIcon, CheckIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline'

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
    const [muted, setMuted] = useState(false)


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
            
            console.log('trailer data adult', data.adult)
                
            if(data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
                setTrailer(data.videos?.results[index]?.key)
                // setMovie(prevMovie => {
                  // console.log('prevMovie', prevMovie)
                  // movie
                // } 
                // )
                setTrailerDetails(data)
            }
            
              

            if(data?.genres) {
              setGenres(data.genres)
            }
        }
        console.log('trailer details', trailerDetails?.runtime)
        console.log('TYPEOF trailer details',typeof trailerDetails?.runtime)

        fetchMovie()
  
    
    }, [movie])
    // console.log('trailer', trailer)
    // console.log('movie adult', movie)
    console.log('trailer details', trailerDetails?.runtime)
    // console.log('TYPEOF trailer details',typeof trailerDetails.runtime)


    const handleClose = () => {
        setShowModal(false)
    } 

    const movieRuntime = trailerDetails?.runtime
    let minutes: any = null
    movieRuntime !== undefined ? minutes = trailerDetails?.runtime : undefined
    const movieLength = (minutes: number): JSX.Element => {
        let hours = Math.floor(minutes/60)
        let mins = minutes % 60
        console.log('getMovieLength RUN', hours + 'hours' + mins + 'minutes')
        return (
          <div> {hours}hr {mins}mins </div>
         )
 
    }

    // getMovieLength(minutes)


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
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
              muted={muted}
            />

         <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
           <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="mt-1 text-black h-7 w-7" />
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
                <p className='font-light'>{movie?.release_date || movie?.first_air_date}</p>
                <p className='hidden font-light md:inline'>
                  { movieLength(minutes) }
                  {/* R{trailerDetails?.runtime} */}
                  </p>
                <p className="text-white">
                {movie?.adult ? (
                      <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">18+</div>
                    ) : 
                    (
                      <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">R</div>
                    )
                  } 
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD 
                </div>
               </div>

               {/* movie overview/description */}
               <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
                 <p className='w-5/6'>{movie?.overview}</p>
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
                  
                          
                   <div>
                    <span className="text-[gray]">trailerDetails adult: </span>
                    {movie?.adult} 
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