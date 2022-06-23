import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC - RecoilRoot
    <RecoilRoot>
      {/* HOC/Higher Order Component - AuthProvider */}
      <AuthProvider>  
         <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
