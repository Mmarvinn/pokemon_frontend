import { Modal } from 'antd';
import { useState } from 'react';
import { getNonceApi } from '../../../api/authApi';
import { MetaMaskLogin } from './MetaMaskLogin';
import { NewMetaMask } from './NewMetaMask';

export const LoginModal = ({ isModalOpen, closeModal, setToken }) => {
  const [nonce, setNonce] = useState(null);

  const handleClick = async () => {
    // await window.ethereum.request({
    //   method: 'eth_requestAccounts',
    // });

    const nonceNumber = await getNonceApi();
    setNonce(nonceNumber.nonce);
    console.log(nonceNumber.nonce);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      className='loginModal'
    >
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
          <NewMetaMask
            nonce={nonce}
            closeModal={closeModal}
            setToken={setToken}
          />
          {/* <MetaMaskLogin
            nonce={nonce}
            closeModal={closeModal}
            setToken={setToken}
          /> */}
        </div>
      </div>
    </Modal>
  );
};
