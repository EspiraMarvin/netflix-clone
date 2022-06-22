import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signInWithPopup } from 'firebase/auth'

interface Inputs {
  email: string
  password: string
}

function login() {
  const [login, setLogin ] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      // await signIn({ email, password})
    } else {
      // await signInWithPopup({email, password})
    }
  }
  // console.log(watch("password"))
  // console.log('errors', errors)


  return (
    <div className='relative flex flex-col h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
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

      <form onSubmit={handleSubmit(onSubmit)} className='relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14'>
        <h1 className="text-4xl font-semibold text-center">Sign In</h1>
        <div className='space-y-4'>
          <label className='inline-block min-w-full'>
            <input 
              type="email"
              placeholder='email' 
              className='input' 
              {...register("email", { required: true })}
            />
                {errors.email &&
                 <p className='p-1 text-[13px] font-light text-orange-500'>Please enter a valid email.</p>
                 }
          </label>
          <label className='inline-block w-full'>
            <input
              type="password"
              placeholder='password'
              className='input' 
              {...register("password",  { required: true, min: 6 })}
            />
              {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button className='w-full py-3 rounded bg-[#e50914] font-semibold' onClick={() => setLogin(true)}>
          Sign In
        </button>

        <div className='text-[gray]'>
          New to Netflix?{' '}
          <button type="submit" className='text-white hover:underline' onClick={() => setLogin(false)}>
            Sign up now
          </button>
        </div>
      </form>

      <div className='absolute bottom-2 right-4 hover:bg-[#e50914] hover:p-4 md:p-3 md:bg-[#e50914] cursor-pointer'>
        <a href="https://www.linkedin.com/in/marvin-espira/" target="_blank"> By Marvin Espira</a>
       
      </div>

    </div>
  )
}

export default login