import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import SwapInterface from '../components/SwapInterface';
import PoolList from '../components/PoolList';
import Header from '../components/Header';

export default function Home() {
  const { account, library } = useWeb3React<Web3Provider>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (account) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Swap</h2>
            <SwapInterface />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Pools</h2>
            <PoolList />
          </div>
        </div>
      </main>
    </div>
  );
} 