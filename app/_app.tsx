// pages/_app.tsx
import type { AppProps } from 'next/app';
import connectToAtlas from '../lib/mongoose';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Ensure the database connection is established
  connectToAtlas();

  return <Component {...pageProps} />;
}

export default MyApp;
