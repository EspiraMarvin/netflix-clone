import Image from "next/image"
import { Movie } from "../typings"

interface Props {
    // when using firebase
    // movie: Movie | DocumentData 
    movie: Movie

}

function ThumbNail({ movie }: Props) {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image 
         src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="object-cover rounded-sm md:rounded"
          layout="fill"
        />
    </div>
  )
}

export default ThumbNail