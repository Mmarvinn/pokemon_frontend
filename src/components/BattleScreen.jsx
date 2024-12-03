import { useEffect, useState } from 'react';
import { PokemonCard } from './pokemons/PokemonCard';
import { damageDeal } from '../utils/calculateDamage';
import { sendLogs } from '../../services/sendLogs';
import useScreenWidth from '../../hooks/useScreenWidth';

export const BattleScreen = ({ botsPokemon, selectedPokemon, restartGame }) => {
  const deviceWidth = useScreenWidth();
  const [isFightStarted, setFightStart] = useState(false);
  const [whoFirst, setWhoFirst] = useState(null);
  const [isAttBtnDisabled, setAttBtnDisable] = useState(false);
  const [logs, setLogs] = useState([]);
  const [botsHp, setBotsHp] = useState(botsPokemon.base.HP);
  const [botsHpPercent, setBotsHpPercent] = useState((100).toFixed(1));
  const [userHp, setUserHp] = useState(selectedPokemon.base.HP);
  const [userHpPercent, setUserHpPercent] = useState((100).toFixed(1));
  const [isUserPokemonDead, setUserPokemonDead] = useState(false);
  const [isBotPokemonDead, setBotPokemonDead] = useState(false);

  const whoStartFirst = () => {
    const userSpeed = selectedPokemon.base.Speed;
    const botSpeed = botsPokemon.base.Speed;

    if (botSpeed > userSpeed) {
      setWhoFirst(botsPokemon.id);
    } else {
      setWhoFirst(selectedPokemon.id);
    }
  };

  const botAttack = () => {
    setAttBtnDisable(true);

    setTimeout(() => {
      const damage = damageDeal(botsPokemon);
      const HpLeft = (userHp - damage).toFixed(1);

      if (HpLeft < 0) {
        setUserHp(0);
        setUserHpPercent(0);
        setUserPokemonDead(true);
        setAttBtnDisable(true);
        setLogs((prevState) => {
          return [
            `${botsPokemon.name.english} hit ${selectedPokemon.name.english} and dealt ${damage} damage`,
            `${selectedPokemon.name.english} has 0 HP left and hi is DEAD !`,
            ...prevState,
          ];
        });
      } else {
        setLogs((prevState) => {
          if (damage === 0) {
            return [
              `${botsPokemon.name.english} missed ${selectedPokemon.name.english} and did not cause any damage`,
              `HP of ${selectedPokemon.name.english} remained unchanged!`,
              ...prevState,
            ];
          } else {
            return [
              `${botsPokemon.name.english} hit ${selectedPokemon.name.english} and dealt ${damage} damage`,
              `${selectedPokemon.name.english} has ${HpLeft} HP left`,
              ...prevState,
            ];
          }
        });

        setUserHp((prevState) => {
          const newHp = prevState - damage;
          setUserHpPercent(
            ((newHp / selectedPokemon.base.HP) * 100).toFixed(1)
          );
          return newHp;
        });
        setAttBtnDisable(false);
      }
    }, 1000);
  };

  const userAttack = () => {
    const damage = damageDeal(selectedPokemon);
    const HpLeft = (botsHp - damage).toFixed(1);

    if (HpLeft < 0) {
      setBotsHp(0);
      setBotsHpPercent(0);
      setBotPokemonDead(true);
      setAttBtnDisable(true);
      setLogs((prevState) => {
        return [
          `${selectedPokemon.name.english} hit ${botsPokemon.name.english} and dealt ${damage} damage`,
          `${botsPokemon.name.english} has 0 HP left and he is DEAD !`,
          ...prevState,
        ];
      });
    } else {
      setLogs((prevState) => {
        if (damage === 0) {
          return [
            `${selectedPokemon.name.english} missed ${botsPokemon.name.english} and did not cause any damage`,
            `HP of ${botsPokemon.name.english} remained unchanged!`,
            ...prevState,
          ];
        } else {
          return [
            `${selectedPokemon.name.english} hit ${botsPokemon.name.english} and dealt ${damage} damage`,
            `${botsPokemon.name.english} has ${HpLeft} HP left`,
            ...prevState,
          ];
        }
      });

      setBotsHp((prevState) => {
        const newHp = prevState - damage;
        setBotsHpPercent(((newHp / botsPokemon.base.HP) * 100).toFixed(1));
        return newHp;
      });

      botAttack();
    }
  };

  useEffect(() => {
    if (isFightStarted && whoFirst === botsPokemon.id) {
      botAttack();
    }
  }, [isFightStarted, whoFirst]);

  useEffect(() => {
    if (isBotPokemonDead || isUserPokemonDead) {
      sendLogs(botsPokemon.name.english, selectedPokemon.name.english, logs);
    }
  }, [isBotPokemonDead, isUserPokemonDead]);

  useEffect(() => {
    whoStartFirst();
  }, []);

  return (
    <div className='battleContainer'>
      <div className='battleContainer__restartWrapper'>
        <button className='button' onClick={restartGame}>
          Restart GAME
        </button>
      </div>
      <div className='battleContainer__pokemons'>
        <div className='pokemons__pokemonWrapper'>
          <span className='pokemons__whosFighterText'>Bots Fighter</span>
          <div className='hpLevelConteiner'>
            <div className='hpLineWrapper'>
              <div
                style={{ width: botsHpPercent + '%' }}
                id='botsHpLevel'
                className='hpLevel'
              />
            </div>
            <span
              id='botsHp'
              className='hpPercentage'
            >{`${botsHpPercent}%`}</span>
          </div>
          <PokemonCard pokemon={botsPokemon} isDead={isBotPokemonDead} />
        </div>
        {!isFightStarted && deviceWidth > 768 && (
          <div className='startFightBtnWrapper'>
            <button className='button' onClick={() => setFightStart(true)}>
              Start FIGHT !
            </button>
          </div>
        )}
        <div className='pokemons__userContainer'>
          {isFightStarted && deviceWidth > 768 && (
            <button
              className={`button ${isAttBtnDisabled && 'disabled'}`}
              onClick={userAttack}
              disabled={isAttBtnDisabled}
            >
              ATTACK !
            </button>
          )}
          <div className='pokemons__pokemonWrapper'>
            <span className='pokemons__whosFighterText'>Your Fighter</span>
            <div className='hpLevelConteiner'>
              <div className='hpLineWrapper'>
                <div
                  style={{ width: userHpPercent + '%' }}
                  id='userHpLevel'
                  className='hpLevel'
                />
              </div>
              <span
                id='userHp'
                className='hpPercentage'
              >{`${userHpPercent}%`}</span>
            </div>
            <PokemonCard pokemon={selectedPokemon} isDead={isUserPokemonDead} />
          </div>
        </div>
        {!isFightStarted && deviceWidth <= 768 && (
          <div className='startFightBtnWrapper'>
            <button className='button' onClick={() => setFightStart(true)}>
              Start FIGHT !
            </button>
          </div>
        )}
        {isFightStarted && deviceWidth <= 768 && (
          <button
            className={`button ${isAttBtnDisabled && 'disabled'} attackBtn`}
            onClick={userAttack}
            disabled={isAttBtnDisabled}
          >
            ATTACK !
          </button>
        )}
      </div>
      <div className='battleConteiner__logs'>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};
