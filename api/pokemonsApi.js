import { GET_POKEMONS_URL, POST_LOGS_DATA_URL } from '../constants/constants';
import { secureRequestApi } from './authApi';

export const getPokemonsApi = async () => {
  const data = await secureRequestApi(GET_POKEMONS_URL);

  return data;
};

export const sendLogsDataApi = async (logs) => {
  const data = await secureRequestApi(POST_LOGS_DATA_URL, {
    method: 'POST',
    body: JSON.stringify(logs),
  });

  return data;
};
