import { useEffect, useState } from 'react';
import { getUserApi } from '../../api/authApi';
import { LoginModal } from './login/LoginModal';
import { getLocalStorageData } from '../../services/localStorage';
import { GameScreen } from './GameScreen';

export const StartScreen = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const userData = await getUserApi();
      setUser(userData);
    } catch (err) {
      console.dir(err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const localStorageToken = getLocalStorageData();
    if (localStorageToken) {
      getUser();
    }
    setLoading(false);
  }, [token]);

  return (
    <>
      {error && <p className='errorMessage'>{error}</p>}
      {loading && <p className='loadingText'>Loading...</p>}
      {!loading && !user && (
        <LoginModal
          isModalOpen={isModalOpen}
          setToken={setToken}
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
      {user && <GameScreen />}
    </>
  );
};
