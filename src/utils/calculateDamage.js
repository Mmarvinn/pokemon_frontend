const calculateDamage = (level, attack, defense, hp) => {
  // Damage = (((2 * Level / 5 + 2) * Power * (Attack / Defense)) / 50 + 2) * Random Factor

  let damage = 0;

  const randomFactor = Math.random();

  if (randomFactor === 0) {
    return damage;
  }

  // calculating power, because there is no data on power
  const power = Math.round(hp * 0.4 + level * 1.5);

  damage = (
    ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
    randomFactor
  ).toFixed(1);

  return damage;
};

export const damageDeal = (pokemon) => {
  let level;

  if (pokemon.evolution.next) {
    level = Number(
      Math.round(pokemon.evolution.next[0][1].split(' ')[1] / 2) + 2
    );
  } else if (pokemon.evolution.prev) {
    level = Number(pokemon.evolution.prev[1].split(' ')[1]);
  } else {
    level = 20; // when we haven`t evolution
  }

  if (isNaN(level)) {
    level = 30;
  }

  const damage = calculateDamage(
    level,
    pokemon.base.Attack,
    pokemon.base.Defense,
    pokemon.base.HP
  );

  return damage;
};
