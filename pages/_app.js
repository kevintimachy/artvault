import '@/styles/globals.css';
import '@/styles/bootstrap.min.css';
import '../styles/custom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';
import Head from 'next/head';



export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>ArtVault</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RouteGuard><Layout><SWRConfig value={{
        fetcher:
          async url => {
            const res = await fetch(url)

            // If the status code is not in the range 200-299,
            // we still try to parse and throw it.
            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data.')
              // Attach extra info to the error object.
              error.info = await res.json()
              error.status = res.status
              throw error
            }
            return res.json()
          }
      }}>

        <Component {...pageProps} /> </SWRConfig></Layout></RouteGuard>
    </>
  );
}
