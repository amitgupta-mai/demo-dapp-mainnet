import { useState } from 'react';
import { Send } from 'lucide-react';
const executeMetamaskTxn = (window as any).exectueMetamaskTxn;
import { ethers } from 'ethers';
import { infoToast } from '../helpers/utils';

enum TransactionType {
  PURE,
  VIEW,
  PAYABLE,
  NONPAYABLE,
}

export function TransferSection() {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleMetamaskTransaction = async() => { 
    try {
      const provider = localStorage.getItem('providerName');
      if(provider !== 'metamask') {
        console.log("🚀 ~ handleMetamaskTransaction ~ provider:", provider)
        return infoToast('You can only use this for metmask transactions!')
      }
      const amountInWei = ethers.parseEther(amount);
      const viewResult = await executeMetamaskTxn(
        TransactionType.PAYABLE,
        walletAddress,
        [],
        'transfer',
        [amountInWei.toString()]
      );
      console.log("View transaction result:", viewResult);

    } catch (error: any) {
      console.error("Transaction failed:", error.message);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Send size={24} className="text-indigo-600" />
        Transfer Balance
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-1">
            Wallet Address
          </label>
          <input
            id="wallet"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter wallet address"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        <button 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
          onClick={handleMetamaskTransaction}
        >
          <Send size={20} />
          Transfer
        </button>
      </div>
    </div>
  );
}