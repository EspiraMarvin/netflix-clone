// import { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { Movie } from '../typings'
import ThumbNail from './ThumbNail'
import { useState, useRef } from 'react'


interface Props {
    title: string
    // using firebase
   // movie: Movie | DocumentData[]
    movies: Movie[]
  }

  
function Row({ title, movies}: Props) {
    // const rowRef = useRef<HTMLDivElement>(null)
    const rowRef = useRef(null)

    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        console.log('direction', direction)
    }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
        </h2>
        <div ref={rowRef} className="relative group md:-ml-2">
            <ChevronLeftIcon className="chevronDirectionIcon" onClick={() => handleClick('left')} />
            <div className='flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2'>
                { movies.map(movie => (
                    <ThumbNail key={movie.id} movie={movie} />
                ))}
            </div>
            <ChevronRightIcon className='chevronDirectionIcon' onClick={() => handleClick('right')}  />
        </div>
    </div>
  )
}

export default Row