import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import requests from '../utils/requests'
import Row from '../components/Row'
import { Movie } from '../typings'
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'
import useList from '../hooks/useList'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[],
  products: Product[] 
}

const Home = ({ 
  netflixOriginals, 
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies, 
  horrorMovies, 
  romanceMovies,
  documentaries,
  products
}: Props) => {
    const { loading, user } = useAuth()
    const showModal = useRecoilValue(modalState)
    const subscription = useSubscription(user)
    const movie = useRecoilValue(movieState)
    const list = useList(user?.uid)

  
  
  if (loading || subscription === null) return null
  
  if (!subscription) return <Plans products={products} />
    


  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>   
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="relative pb-24 pl-4 lg:space-y-24 lg:pl-16">
         <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />

          {/* my list component */}
          {
            list.length > 0 &&
           <Row title="My List" movies={list} />
          }
           {/* my list component */}
           {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
          
        </section>
         { showModal && <Modal /> }
      </main>
      <footer className='relative'>
         <div className='absolute bottom-2 right-4 hover:bg-[#e50914] hover:p-4 md:p-3 md:bg-[#e50914] cursor-pointer'>
            <a href="https://www.linkedin.com/in/marvin-espira/" target="_blank"> By Marvin Espira</a>
          </div>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {

  // produts pricing plans
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true
  }).then((res) => res)
    .catch(error => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results, 
      products
    }
  }
}