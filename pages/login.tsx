import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import CircularProgress from '@mui/material/CircularProgress'

interface Inputs {
  email: string
  password: string
}

function login() {
  const [login, setLogin] = useState(false)
  const {
    signIn,
    signUp,
    signInAnon,
    loadingSignIn,
    loadingSignInAnonymously,
    loadingSignUp,
  } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [signInAnonClicked, setSignInAnonClicked] = useState(false)

  const signTestUserAnonymously = async () => {
    setSignInAnonClicked(true)
    await signIn('test@gmail.com', '123pass')
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (email.length > 1 && password.length > 4) {
      await signIn(email, password)
    } else if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex flex-col h-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold text-center">Sign In</h1>

        <div className="flex items-center justify-center">
          <button
            className="px-6 py-3 rounded bg-[#e50914] font-semibold"
            onClick={() => signTestUserAnonymously()}
          >
            <span> SignIn Test User Anonymously</span>
          </button>
        </div>

        <div className="flex flex-col items-start text-red-500">
          NOTE: This is NOT the official Netflix Site.
          <br />
          To test this site use infor 👇️ for account setup
          <br />
          <div className="flex flex-col items-start pl-2">
            <li> 4242 - 4242 - 4242 - 42424 as visa card no. </li>
            <li> Any 3 digits as your CVC.</li>
          </div>
        </div>

        <div className={`space-y-4 ${signInAnonClicked && 'hidden'}`}>
          <label className="inline-block min-w-full">
            <input
              type="email"
              placeholder="email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="password"
              className="input"
              {...register('password', { required: true, min: 6 })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          className="w-full py-3 rounded bg-[#e50914] font-semibold"
          onClick={() => setLogin(true)}
        >
          {!loadingSignIn ? (
            <span> Sign In</span>
          ) : (
            <CircularProgress
              size={25}
              thickness={4}
              className="text-white"
              style={{ color: 'white' }}
            />
          )}
        </button>

        {/* <button className="w-full py-3 rounded bg-[#e50914] font-semibold" onClick={() => signAnon()}>
          { !loadingSignInAnonymously ?
            <span> Sign In Anonymously</span>
            : 
            <CircularProgress size={25} thickness={4} className="text-white" style={{color: "white"}} /> }
        </button> */}

        <div className="w-full border-t-[1px] border-gray-200"></div>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="pl-2 text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            {!loadingSignUp ? (
              <span> Sign up now</span>
            ) : (
              <span>Loading...</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default login
