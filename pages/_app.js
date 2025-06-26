import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>HealthTranslate - Breaking Language Barriers in Healthcare</title>
        <meta name="description" content="Real-time translation powered by AI, enabling seamless communication between healthcare providers and patients." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </main>
    </>
  );
}