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
  console.log(signData);

  return (
    <div className='metaMaskUiContainer'>
      <MetaMaskButton theme={'light'} color='white'></MetaMaskButton>
      {isConnected && (
        <>
          {!signData && (
            <div>
              <button
                className='button'
                disabled={isSignLoading}
                onClick={() => signMessage()}
              >
                Sign message
              </button>
              {isSignError && <div>Error signing message</div>}
            </div>
          )}
          <MetaMaskLogin
            account={address}
            signature={signData}
            nonce={nonce}
            closeModal={closeModal}
            setToken={setToken}
          />
        </>
      )}
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
