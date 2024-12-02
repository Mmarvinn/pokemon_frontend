import { useState, useEffect } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { loginApi } from '../../../api/authApi';
import { BrowserProvider } from 'ethers';
import { setLocalStorageData } from '../../../services/localStorage';

export const MetaMaskLogin = ({ nonce, closeModal, setToken }) => {
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { connected, account } = useSDK();

  const message = `Authorize access to your account: Sign this message to log in. Nonce: ${nonce}`;

  const userSignMessage = async () => {
    if (!nonce) return;

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signedMessage = await signer.signMessage(message);
      setSignature(signedMessage);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to sign message');
      console.error(err);
    }
  };

  const handleLogin = async () => {
    if (!signature || !account) return;

    try {
      const response = await loginApi({ address: account, signature, nonce });

      if (response.token) {
        setLocalStorageData(response.token);
        setToken(response.token);
        alert('Login successful!');
        closeModal();
      } else {
        setError('Failed to authenticate');
      }
    } catch (err) {
      setError('Error during authentication');
      console.error(err);
    }
  };

  useEffect(() => {
    if (connected && account) {
      userSignMessage();
    }
  }, [connected, account, nonce]);

  return (
    <div className='containerFlexColCenter'>
      {loading && <p className='loadingMessage'>Signing message...</p>}
      {error && <p className='errorMessage'>{error}</p>}
      {signature && (
        <div className='containerFlexColCenter'>
          <p className='loadingMessage'>Message signed successfully!</p>
          <button className='button' onClick={handleLogin}>
            Authenticate with Signed Message
          </button>
        </div>
      )}
    </div>
  );
};
