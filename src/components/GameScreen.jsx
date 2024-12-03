import { useEffect, useState } from 'react';
import { PokemonsList } from './pokemons/PokemonsList';
import { BattleScreen } from './BattleScreen';
import { getPokemonsApi } from '../../api/pokemonsApi';

export const GameScreen = () => {
  const [pokemons, setPokemons] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [botsPokemon, setBotsPokemon] = useState(null);
  const [isGameStarted, setGameStarted] = useState(false);

  const getPokemons = async () => {
    const data = await getPokemonsApi();
    setPokemons(data);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    const userPokemonType = new Set(selectedPokemon?.type);

    if (pokemons) {
      const allOfTypes = new Set(pokemons.flatMap((pokemon) => pokemon.type));

      const botsPokemonTypes = new Set(
        Array.from(allOfTypes).filter((item) => !userPokemonType.has(item))
      );

      const pokemonsForBot = pokemons.filter((pokemon) =>
        pokemon.type.some((type) => botsPokemonTypes.has(type))
      );

      for (let i = 0; i < 100; i++) {
        const randomId = Math.floor(Math.random() * pokemonsForBot.length);
        const prevBotsPokemon = pokemonsForBot[randomId];
        const match = prevBotsPokemon.type.some((item) =>
          userPokemonType.has(item)
        );
        if (!match) {
          setBotsPokemon(prevBotsPokemon);
          break;
        }
      }
    }
  }, [selectedPokemon]);

  return (
    <>
      {isGameStarted ? (
        <BattleScreen
          botsPokemon={botsPokemon}
          selectedPokemon={selectedPokemon}
          restartGame={() => setGameStarted(false)}
        />
      ) : (
        <PokemonsList
          pokemons={pokemons}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          startGame={() => setGameStarted(true)}
        />
      )}
    </>
  );
};
