import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

interface TokenSelectProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
}

// 示例代币列表
const COMMON_TOKENS: Token[] = [
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    symbol: 'DAI',
    decimals: 18,
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    symbol: 'USDC',
    decimals: 6,
  },
];

export default function TokenSelect({ selectedToken, onSelect }: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = COMMON_TOKENS.filter((token) =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        {selectedToken ? (
          <>
            <span className="font-medium">{selectedToken.symbol}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </>
        ) : (
          <>
            <span className="text-gray-500">Select Token</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </>
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Select Token
                </Dialog.Title>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search by name or paste address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-4 max-h-60 overflow-y-auto">
                  {filteredTokens.map((token) => (
                    <button
                      key={token.address}
                      onClick={() => {
                        onSelect(token);
                        setIsOpen(false);
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                    >
                      <span className="font-medium">{token.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
} 