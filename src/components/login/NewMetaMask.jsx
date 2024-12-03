import {
  MetaMaskButton,
  useAccount,
  useSDK,
  useSignMessage,
} from '@metamask/sdk-react-ui';
import { MetaMaskLogin } from './MetaMaskLogin';

function AppReady({ nonce, closeModal, setToken }) {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: `Authorize access to your account: Sign this message to log in. Nonce: ${nonce}`,
  });

  const { isConnected, address } = useAccount();

  return (
    <div className='App'>
      <header className='App-header'>
        <MetaMaskButton theme={'light'} color='white'></MetaMaskButton>
        {isConnected && (
          <>
            <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>
              {/* {isSignSuccess && <div>Signature: {signData}</div>} */}
              {isSignError && <div>Error signing message</div>}
            </div>
            <MetaMaskLogin
              account={address}
              signature={signData}
              nonce={nonce}
              closeModal={closeModal}
              setToken={setToken}
            />
          </>
        )}
      </header>
    </div>
  );
}

export const NewMetaMask = ({ nonce, closeModal, setToken }) => {
  const { ready } = useSDK();

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <AppReady nonce={nonce} closeModal={closeModal} setToken={setToken} />;
};
