import { CheckIcon } from '@heroicons/react/outline'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { loadCheckout } from '../lib/stripe'
import payments from '../lib/stripe'
import Loader from './Loader'
import Table from './Table'

interface Props {
    products: Product[]
}

const Plans = ({ products }: Props) => {
    const { logOut, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[3])
    const [billingLoading, setBillingLoading] = useState(false)
    const isMounted = useRef(false)

    useEffect(() => {
      if (isMounted.current) return
      isMounted.current = true

      async function fetchPlans() {
        await getProducts(payments, {
          includePrices: true,
          activeOnly: true,
        })
          .then((res) => {
            return res
          })
          .catch((error) => console.log('error', error))
      }
      fetchPlans()
    }, [])
        

    const PlansDescList = (): React.ReactNode => 
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

        const subscribeToPlan = () => {
            if(!user) return

            loadCheckout(selectedPlan?.prices[0].id!)
            setBillingLoading(true)
        }

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

        <main className="max-w-5xl px-1 pb-12 mx-auto mb-5 font-medium transition-all pt-28 md:px-10">
            <h1 className="mb-4 text-xl xl:text-2xl">Choose the plan that's right for you</h1>
            {/* plans description list */}
            {PlansDescList()}

            <div className="flex flex-col mt-4 space-y-4">
                <div className="flex items-center self-end justify-end w-full md:w-3/5">
                    {products.map(product => (
                        <div
                         key={product.id} 
                         className={`planBox
                         ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"}`}
                         onClick = {() => setSelectedPlan(product)}
                        >
                          {product.name}
                        </div>
                    ))
                    }
                </div>

                <Table products={products} selectedPlan={selectedPlan} />

                <button
                    disabled={!selectedPlan || billingLoading}
                    className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
                    billingLoading && 'opacity-60'
                    }`}
                    onClick={subscribeToPlan}
                >
                    {billingLoading ? (
                    <Loader color="dark:fill-gray-300" />
                    ) : (
                    'Subscribe'
                    )}
                </button>
            </div>
        </main>
    </div>

  )
}

export default Plans