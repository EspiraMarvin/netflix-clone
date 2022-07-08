import { onSnapshot, collection, DocumentData } from 'firebase/firestore'
import { useEffect, useState, useRef } from 'react'
import { db } from '../lib/firebase'
import { Movie } from '../typings'

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[]>([])
    const isMounted = useRef(false)

    useEffect(() => {
      if (isMounted.current) return
      isMounted.current = true

      if (!uid) return 

      // retrieving myList from firestore
      return onSnapshot(
        collection(db, 'customers', uid, 'myList'), 
        (snapshot) => {
          setList(
              snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          )
        }
      )
    }, [db, uid])

  return list

}

export default useList