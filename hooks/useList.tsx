import { onSnapshot, collection, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { Movie } from '../typings'

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[]>([])

    useEffect(() => {
      if (!uid) return 

      // retrieving mylist from firestore
      return onSnapshot(
        collection(db, 'customers', uid, 'mylist'), 
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