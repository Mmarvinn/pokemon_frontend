import { PokemonCard } from './PokemonCard';

export const PokemonsList = ({
  pokemons,
  selectedPokemon,
  setSelectedPokemon,
  startGame,
}) => {
  return (
    <div className='pokemonsListAndButton'>
      <div className='pokemonsWrapper'>
        {pokemons?.map((pokemon) => {
          return (
            <PokemonCard
              selectedPokemon={selectedPokemon}
              onClick={() => setSelectedPokemon(pokemon)}
              key={pokemon.id}
              pokemon={pokemon}
            />
          );
        })}
      </div>
      {selectedPokemon && (
        <button onClick={startGame} className='button'>
          Start Game
        </button>
      )}
    </div>
  );
};
