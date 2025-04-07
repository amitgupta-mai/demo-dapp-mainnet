import { Wallet2, Power } from 'lucide-react';
const fetchWalletBalance = (window as any).fetchWalletBalance;

interface HeaderActionsProps {
  onDisconnect: () => void;
}

export function HeaderActions({ onDisconnect }: HeaderActionsProps) {
  const handleFetchBalance = () => {
    if (typeof fetchWalletBalance === 'function') {
      fetchWalletBalance();
    } else {
      window.location.reload();
    }
  };
  const handleDisconnect = () => {
    onDisconnect();
    localStorage.clear();
  };

  return (
    <div className='flex justify-between mt-2 mb-8'>
      <button
        className='flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
        onClick={handleFetchBalance}
      >
        <Wallet2 size={20} />
        Update Balance
      </button>

      <button
        className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
        onClick={handleDisconnect}
      >
        <Power size={20} />
        Disconnect
      </button>
    </div>
  );
}
