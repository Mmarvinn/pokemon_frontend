const POKEMON_THE_GAME_JWT = 'PokemonTheGameJWT';

export const getLocalStorageData = () => {
  const data = localStorage.getItem(POKEMON_THE_GAME_JWT);
  return JSON.parse(data);
};

export const setLocalStorageData = (data) => {
  const json = JSON.stringify(data);
  localStorage.setItem(POKEMON_THE_GAME_JWT, json);
};

export const deleteLocalStorageData = () => {
  localStorage.removeItem(POKEMON_THE_GAME_JWT);
};
