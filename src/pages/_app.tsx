import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/fonts.css'

import type { AppProps } from 'next/app'
import { Layout } from '../components/layout/Layout'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { GlobalToaster } from '../components/globals/GlobalToaster'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <GlobalToaster />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
