// import { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DocumentData } from 'firebase/firestore'
import { useState, useRef } from 'react'
import { Movie } from '../typings'
import ThumbNail from './ThumbNail'



interface Props {
    title: string
    // using firebase. Movies from myList 
   movies: Movie[] | DocumentData[]
  }

  
function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        setIsMoved(true)
        if (rowRef.current) {
          const { scrollLeft, clientWidth } = rowRef.current

          const scrollTo =
            direction === 'left'
              ? scrollLeft - clientWidth
              : scrollLeft + clientWidth
          rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    // console.log(rowRef.current!.scrollLeft, rowRef.current!.clientWidth)
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
        </h2>
        <div className="relative group md:-ml-2">
            <ChevronLeftIcon 
              className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100
               ${!isMoved && 'hidden'}
               `} 
              onClick={() => handleClick('left')} 
             />
            <div className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
             ref={rowRef}
            >
                { movies.map((movie) => (
                    <ThumbNail key={movie.id} movie={movie} />
                ))}
            </div>
            <ChevronRightIcon 
             className="absolute top-0 bottom-0 z-40 m-auto transition opacity-0 cursor-pointer right-2 h-9 w-9 hover:scale-125 group-hover:opacity-100"
             onClick={() => handleClick('right')} 
            />
        </div>
    </div>
  )
}

export default Row