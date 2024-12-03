// export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://pokemon-backend-dlbr.onrender.com';

const AUTH_ROUTE = '/auth';
const POKEMON_ROUTE = '/pokemon';

export const LOGIN_URL = `${BASE_URL}${AUTH_ROUTE}/login`;
export const GET_NONCE_URL = `${BASE_URL}${AUTH_ROUTE}/nonce`;
export const GET_USER_URL = `${BASE_URL}${AUTH_ROUTE}/get_user`;

export const GET_POKEMONS_URL = `${BASE_URL}${POKEMON_ROUTE}/get_all`;
export const POST_LOGS_DATA_URL = `${BASE_URL}${POKEMON_ROUTE}/logs`;
