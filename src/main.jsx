import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MetaMaskProvider } from '@metamask/sdk-react';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: 'Pokemon the Game',
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
      }}
    >
      <App />
    </MetaMaskProvider>
  </StrictMode>
);
