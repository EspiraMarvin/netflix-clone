import { jsx } from '@emotion/react'
import { CheckIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'

function Plans() {
    const { logOut } = useAuth()

    const PlansDescList  = (): React.ReactNode => 
         (
            <ul>
              <li className="flex items-center text-lg gap-x-2">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                Ad-free.
             </li>
             <li className="flex items-center text-lg gap-x-2">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                just for you.
             </li>
             <li className="flex items-center text-lg gap-x-2">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                your plan anytime.
             </li>
            </ul>
        )

  return (
    <div>
        <Head>
            <title>Netflix</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="border-b border-white/10 bg-[#141414]">
            <Link href="/">
                <img
                src="https://rb.gy/ulxxee" 
                width={150}
                height={90}
                className="object-contain cursor-pointer"
                alt="Netflix"
                />
            </Link>
            <button className="font-medium text-lh hover:underline" onClick={logOut}>
                Sign Out
            </button>
        </header>

        <main className="max-w-5xl px-5 pb-12 font-medium transition-all mb-5text-3xl pt-28 md:px-10">
            <h1>Choose the plan that's right for you</h1>
            {/* plans description list */}
            {PlansDescList()}

            <div className="flex flex-col mt-4 space-y-4">
                <div className="flex items-center self-end justify-end w-full md:w-3/5">
                    <div className="planBox">standard</div>
                    <div className="planBox">standard</div>
                    <div className="planBox">standard</div>
                </div>

                {/* <Table/> */}

                <button>Subscribe</button>
            </div>
        </main>
    </div>

  )
}

export default Plans