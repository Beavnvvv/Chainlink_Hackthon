import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

interface Pool {
  address: string;
  token0: {
    symbol: string;
    address: string;
  };
  token1: {
    symbol: string;
    address: string;
  };
  tvl: string;
  volume24h: string;
}

export default function PoolList() {
  const { account, library } = useWeb3React();
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      if (!library) return;

      try {
        setIsLoading(true);
        // TODO: 从合约获取实际的池子数据
        // 这里使用模拟数据
        setPools([
          {
            address: '0x...',
            token0: {
              symbol: 'WETH',
              address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            },
            token1: {
              symbol: 'DAI',
              address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            },
            tvl: '$1,000,000',
            volume24h: '$100,000',
          },
          // 添加更多池子...
        ]);
      } catch (error) {
        console.error('Error fetching pools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPools();
  }, [library]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pools.map((pool) => (
        <div
          key={pool.address}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                {pool.token0.symbol}/{pool.token1.symbol}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">TVL: {pool.tvl}</div>
              <div className="text-sm text-gray-600">
                24h Volume: {pool.volume24h}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 