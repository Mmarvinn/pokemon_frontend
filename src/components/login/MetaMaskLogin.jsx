import { useState } from 'react';
import { loginApi } from '../../../api/authApi';
import { setLocalStorageData } from '../../../services/localStorage';

export const MetaMaskLogin = ({
  nonce,
  closeModal,
  setToken,
  signature,
  account,
}) => {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!signature || !account) return;

    try {
      const response = await loginApi({ address: account, signature, nonce });

      if (response.token) {
        setLocalStorageData(response.token);
        setToken(response.token);
        alert('Login successful! Enjoy :) ');
        closeModal();
      } else {
        setError('Failed to authenticate');
      }
    } catch (err) {
      setError('Error during authentication');
      console.error(err);
    }
  };

  return (
    <div className='containerFlexColCenter'>
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
