import Image from 'next/image'
import { Movie } from '../typings'
import { useEffect, useState } from 'react'
import { baseUrl } from '../utils/imageUrl'
import  { FaPlay} from "react-icons/fa"
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  
  useEffect(() => {
    // select a random movie and display to the banner
    setMovie( netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)] )
  }, [netflixOriginals])

  return (
    // <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 xl:pb-7 2xl:pb-4">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold 2xl:w-full md:text-4xl lg:text-5xl xl:text-7xl">
        {movie?.title || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="text-black bg-white bannerButton">
          <FaPlay
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
            className="w-4 h-4 text-black md:h-7 md:w-7"
          />
          Play
        </button>
        <button
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
          className="bannerButton bg-[gray]/50"
        >
          <InformationCircleIcon className="w-5 h-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner