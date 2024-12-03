import { GET_NONCE_URL, GET_USER_URL, LOGIN_URL } from '../constants/constants';
import { getLocalStorageData } from '../services/localStorage';

export const getNonceApi = async () => {
  const res = await fetch(GET_NONCE_URL);

  if (!res.ok) {
    throw new Error(`${res.statusText}, status: ${res.status}`);
  }

  const data = await res.json();

  return data;
};

export const loginApi = async (userCredentials) => {
  const res = await fetch(LOGIN_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(userCredentials),
  });

  if (!res.ok) {
    throw new Error(`${res.statusText}, status: ${res.status}`);
  }

  const data = await res.json();

  return data;
};

export const secureRequestApi = async (url, options = {}) => {
  const token = getLocalStorageData();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = new Error(`${res.statusText}, status: ${res.status}`);
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }

  const data = await res.json();

  return data;
};

export const getUserApi = async () => {
  const data = await secureRequestApi(GET_USER_URL, {});

  return data;
};
