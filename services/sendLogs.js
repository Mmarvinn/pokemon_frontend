import { sendLogsDataApi } from '../api/pokemonsApi';

export const sendLogs = async (botPokemon, userPokemon, logs) => {
  const newLogs = {
    date: Date.now(),
    yourPokemon: userPokemon,
    opponentPokemon: botPokemon,
    logs: logs,
  };
  const data = await sendLogsDataApi(newLogs);
  console.log(data);
};
