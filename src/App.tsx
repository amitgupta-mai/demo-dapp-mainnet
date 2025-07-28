import { useEffect, useMemo } from 'react';
import { ApiKeySection } from './components/ApiKeySection';
// import { HeaderActions } from './components/HeaderActions';
import { useApiKey } from './hooks/useApiKey';
import { KalpTransfer } from './components/KalpTransfer';

function App() {
  const { apiKey, isLoading, setApiKey } = useApiKey();

  const defaultDappConfig = useMemo(() => {
    return {
      NETWORK_NAME: 'Mainnet',
      CHAINCODE_NAME: 'koot',
      CHANNEL_NAME: 'kalptwo',
      DAPP_URL: window.location.origin,
      DAPP_ICON:
        'https://kalp-cbdc-images.s3.ap-south-1.amazonaws.com/CBDC.png',
      DAPP_NAME: 'sample_dapp Mainnet',
      permissions: ['transaction'],
    };
  }, []);

  useEffect(() => {
    if (apiKey) {
      const renderMyWidget = (window as any).renderMyWidget;
      if (renderMyWidget) {
        renderMyWidget('kalp-test', apiKey, defaultDappConfig);
      } else {
        console.error('renderMyWidget is not defined');
      }
    }
  }, [apiKey, defaultDappConfig]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8 flex items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8'>
      <div className='max-w-md mx-auto'>
        {!apiKey ? (
          <ApiKeySection onSubmit={setApiKey} />
        ) : (
          <>
            <div id='kalp-test'></div>
            {/* <HeaderActions onDisconnect={clearApiKey} /> */}
            <div className='mt-8'>
              <KalpTransfer />
            </div>
            {/* <TransferSection /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
