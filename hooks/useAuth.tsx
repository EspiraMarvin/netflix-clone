import { useState, createContext, useContext, useEffect, useMemo } from "react"
import { useRouter } from "next/router"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'
import { auth } from '../firebase'


interface IAuth { //inteface auth(IAuth)
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logOut: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({ 
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false
}) 

interface AuthProviderProps {
    children: React.ReactNode // React.ReactNode is a type of children in React Typescript
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error , setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true) // displays before the user authenticates
    const router = useRouter()

    // persisting the loggedin user if authenticated and if there's no user redirect back to login page
    useEffect(
        () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Logged in ...
                // if(router.pathname === '/login') router.push('/')
                setUser(user)
                setLoading(false)
                // console.log('user', user)
                // console.log('router', router)
            } else {
                // Not Logged in ...
                setUser(null)   
                setLoading(true)
                router.push('/login')
            }

            setInitialLoading(false)
        })
    }, [auth])

/*
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )
  */


    
    // sign up fn
    const signUp = async (email: string, password: string) => {
        setLoading(true)
        
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoading(false)
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    // sign in fn
    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoading(false)
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    // logout fn
    const logOut =async () => {
        setLoading(true)
        
        await signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }


    const memoedValue = useMemo(
        () => ({ user, signUp, signIn, loading, logOut, error}),
        [user, loading]
    )

  return (
    <AuthContext.Provider value={memoedValue}>
        {!initialLoading && children}
    </AuthContext.Provider>
  )

}

export default function useAuth() {
    return useContext(AuthContext)
}
