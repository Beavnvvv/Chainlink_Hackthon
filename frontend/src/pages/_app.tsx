import type { AppProps } from 'next/app';
import Web3ProviderWrapper from '../components/Web3Provider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ProviderWrapper>
      <Component {...pageProps} />
    </Web3ProviderWrapper>
  );
} 