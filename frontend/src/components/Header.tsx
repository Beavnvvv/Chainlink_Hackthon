import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useState } from 'react';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42], // 支持的链ID
});

export default function Header() {
  const { activate, deactivate, account } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      await activate(injected);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">MEV Protected DEX</h1>
        <div>
          {account ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </span>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 