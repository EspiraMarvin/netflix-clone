import React, { useEffect, useState, useRef } from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import { Element, Genre } from '../typings'
import { XIcon } from '@heroicons/react/outline'
import Player from './Player';
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
    const [showMore, setShowMore] = useState(true)


    useEffect(() => {
      if (isMounted.current)  return 
      isMounted.current = true

        if(!movie) return
        // console.log('current movie', movie)


        async function fetchMovie() {
            
            const data =  await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                  }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                  }&language=en-US&append_to_response=videos`
            ).then(response => response.json())
            .catch(err => err)
            
            // console.log('movies data', data)
            
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

    // movie length in hours and mins
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

    // movie description/overview length
    const overViewLength = movie?.overview.length 

    //  movie release year
    const showYear = (date: string): React.ReactNode => {
      return date !== undefined ? format(new Date(date), 'yyyy') : null
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

         {/* movie player component */}
           <Player trailer={trailer} />

         <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
               <div className="flex items-center space-x-2 text-sm">
                <p className='font-semibold text-green-400'>{(movie!.vote_average * 10).toFixed(0)}% Match</p>
                <p className='font-light'>{ showYear(movie?.release_date || movie?.first_air_date) }</p>

                <p className="text-white">
                  {movie?.adult ? 
                   ( <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">18+</div> )
                   : 
                   ( <div className="flex items-center justify-center h-4 border rounded border-white/40 px-1.5 text-xs">R</div> )
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
                  {/* length{movie?.overview.length} */}
                  {
                    movie?.overview.length > 0 ?
                    (
                    <>
                     { movie?.overview.length > 160 && showMore 
                     ? movie?.overview.slice(0, 160) 
                     : movie?.overview} 
                     {showMore && movie?.overview.length > 160 && (<span> ... </span>) }
                    </>
                    )
                    :
                    (
                      <>No Description !!</>
                    )
                  }
                 {/* / { movie?.overview.length > 160 && showMore ? movie?.overview.slice(0, 160) : movie?.overview} {showMore && (<span> ... </span>) } */}
                   <button 
                     className={`${showMore && overViewLength > 160 && "showMoreButton font-semibold"} ${!showMore && overViewLength > 160 &&  "showLessButton ml-1"} `}
                     onClick={() => setShowMore(!showMore)}
                    >
                     { showMore && overViewLength > 160 && (<span>Show more</span>) }
                     { !showMore && overViewLength > 160 && (<span>Show less</span>) }

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