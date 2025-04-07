import { useState, useEffect } from 'react';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    setApiKey(storedApiKey);
    setIsLoading(false);
  }, []);

  const setNewApiKey = (key: string) => {
    localStorage.setItem('apiKey', key);
    localStorage.setItem('userId','32cd1dc3-2ee3-4e76-807c-13cb32c3e0ff');
    setApiKey(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem('apiKey');
    setApiKey(null);
  };

  return { apiKey, isLoading, setApiKey: setNewApiKey, clearApiKey };
}