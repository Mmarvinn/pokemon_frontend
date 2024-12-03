import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: 'Pokemon the Game',
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.INFURA_API_KEY,
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </StrictMode>
);
