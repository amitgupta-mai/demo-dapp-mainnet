import React, { useState } from 'react';
import { Key } from 'lucide-react';

interface ApiKeySectionProps {
  onSubmit: (key: string) => void;
}

export function ApiKeySection({ onSubmit }: ApiKeySectionProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onSubmit(apiKey);
      setApiKey('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Key size={24} className="text-indigo-600" />
        API Key
      </h2>
      
      <div className="space-y-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="Enter your API key"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Key size={20} />
          Submit
        </button>
      </div>
    </div>
  );
}