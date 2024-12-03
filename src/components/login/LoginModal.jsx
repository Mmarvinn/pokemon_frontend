import { Modal } from 'antd';
import { useState } from 'react';
import { getNonceApi } from '../../../api/authApi';
import { MetaMaskUi } from './MetaMaskUi';

export const LoginModal = ({ isModalOpen, closeModal, setToken }) => {
  const [nonce, setNonce] = useState(null);

  const handleClick = async () => {
    const nonceNumber = await getNonceApi();
    setNonce(nonceNumber.nonce);
  };

  return (
    <Modal open={isModalOpen} footer={null} className='loginModal'>
      <div className='loginModal__contentWrapper'>
        <h3 className='contentWrapper__heading'>
          You must login first before play the game !
        </h3>
        <div className='loginModal__btnsWrapper'>
          {!nonce && (
            <button className='button' onClick={handleClick}>
              Get Nonce
            </button>
          )}
          {nonce && (
            <MetaMaskUi
              nonce={nonce}
              closeModal={closeModal}
              setToken={setToken}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
