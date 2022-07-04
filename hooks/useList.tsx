import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Movie } from '../typings'

function useList(uid: string) {
    const [list, setList] = useState<Movie[] | DocumentData[]>()

    useEffect(() => {

    }, [])
  return (
    <div>useList</div>
  )
}

export default useList