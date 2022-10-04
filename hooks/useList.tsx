import { onSnapshot, collection, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { Movie } from '../typings'

function useList(uid: string | undefined) {
    const [list, setList] = useState<DocumentData[] | Movie[]>([])

    useEffect(() => {
      if (!uid) return 

      // retrieving myList from firestore
      return onSnapshot(
        collection(db, 'customers', uid, "myList"), 
        (snapshot) => {
          setList(
              snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          )
          // console.log('list of movies at useList hook',list)
        }
      )
    }, [db, uid])

   

  return list

}

export default useList