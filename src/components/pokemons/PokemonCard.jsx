export const PokemonCard = ({ pokemon, onClick, selectedPokemon, isDead }) => {
  const abilities = pokemon.profile.ability.filter((ability) => {
    if (ability[1] === 'true') {
      return ability[0];
    }
  });

  return (
    <div
      className={`${
        selectedPokemon?.id === pokemon.id && 'selected'
      } pokemonCard ${isDead && 'dead'}`}
      id={pokemon.id}
      onClick={onClick && onClick}
    >
      <div className='pokemonCard__cardHeader'>
        <div className='cardHeader__spriteWrapper dFlex'>
          <img
            src={pokemon.image.sprite}
            alt={`pokemon ${pokemon.name.english}`}
          />
        </div>
        <div className='cardHeader__nameAndHp'>
          <p>{pokemon.name.english}</p>
          <p>{`HP: ${pokemon.base.HP}`}</p>
        </div>
      </div>
      <div className='pokemonCard__mainImageWrapper'>
        <img
          src={pokemon.image.hires}
          alt={`pokemon ${pokemon.name.english}`}
        />
      </div>
      <div className='pokemonCard__statistics'>
        <p className='statistics__description'>{pokemon.description}</p>
        <div className='divider' />
        <div className='statistics__base'>
          <p>{`Attack: ${pokemon.base.Attack}`}</p>
          <p>{`Defence: ${pokemon.base.Defense}`}</p>
          <p>{`Speed: ${pokemon.base.Speed}`}</p>
          <p>{`HP: ${pokemon.base.HP}`}</p>
        </div>
        {abilities.length !== 0 && <div className='divider' />}
        {abilities.length !== 0 && (
          <div className='statistics__abilities'>
            {abilities.map((item) => (
              <p key={item[0]}>{item[0]}</p>
            ))}
          </div>
        )}
        <div className='divider' />
        <p className='statistics__species'>{pokemon.species}</p>
        <div className='divider' />
        <div className='statistics__type'>
          {pokemon.type.map((type) => {
            return <p key={type}>{type}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
