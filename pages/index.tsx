import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {/* { Banner} */}
        <section>
          {/* { Row } */}
          {/* { Row } */}
          {/* { Row } */}
          {/* { Row } */}
          {/* { Row } */}
          {/* { Row } */}
        </section>
        {/* { Modal } */}
      </main>

    </div>
  )
}

export default Home
