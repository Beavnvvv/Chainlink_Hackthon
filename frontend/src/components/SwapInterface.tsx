import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import TokenSelect from './TokenSelect';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

export default function SwapInterface() {
  const { account, library } = useWeb3React();
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = async () => {
    if (!account || !library || !fromToken || !toToken || !fromAmount) return;

    try {
      setIsLoading(true);
      // TODO: 实现实际的交换逻辑
      // 1. 检查代币授权
      // 2. 调用router合约进行交换
      // 3. 处理MEV保护逻辑
    } catch (error) {
      console.error('Swap error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (value: string) => {
    setFromAmount(value);
    // TODO: 计算预期输出金额
    setToAmount('0');
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">From</span>
          <span className="text-gray-600">Balance: 0.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.0"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <TokenSelect
            selectedToken={fromToken}
            onSelect={setFromToken}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            const temp = fromToken;
            setFromToken(toToken);
            setToToken(temp);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          ↓↑
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">To</span>
          <span className="text-gray-600">Balance: 0.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={toAmount}
            readOnly
            placeholder="0.0"
            className="flex-1 p-2 border rounded-lg bg-gray-100"
          />
          <TokenSelect
            selectedToken={toToken}
            onSelect={setToToken}
          />
        </div>
      </div>

      <button
        onClick={handleSwap}
        disabled={!account || !fromToken || !toToken || !fromAmount || isLoading}
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {!account
          ? 'Connect Wallet'
          : !fromToken || !toToken
          ? 'Select Tokens'
          : !fromAmount
          ? 'Enter Amount'
          : isLoading
          ? 'Swapping...'
          : 'Swap'}
      </button>
    </div>
  );
} 