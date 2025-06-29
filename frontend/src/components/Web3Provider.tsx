import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

interface Props {
  children: React.ReactNode;
}

export default function Web3ProviderWrapper({ children }: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
} 