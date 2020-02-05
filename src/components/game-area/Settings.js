import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.css';

const Settings = ({ options, handleNewOptions, handleResetButton }) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);
  const setPlayers = players => handleNewOptions({ ...options, humanVsHuman: (players === 'vsHuman') });
  const setName1 = ({ target }) => handleNewOptions({ ...options, playerNames: [target.value, options.playerNames[1]] });
  const setName2 = ({ target }) => handleNewOptions({ ...options, playerNames: [options.playerNames[0], target.value] });
  const setDifficulty = aiDifficulty => handleNewOptions({ ...options, aiDifficulty });
  const setMotif = userMotif => handleNewOptions({ ...options, userMotif });

  return (
    <>
      <div className={styles.Settings}>
        <button onClick={handleResetButton}>New Game</button>
        <button onClick={toggleSettings}>Settings</button>
      </div>
      {showSettings &&
        <div className={styles.SettingsPanel}>
          <div>
            <h3>Players</h3>
            <label onClick={() => setPlayers('vsComputer')}>
              <input type='radio' id='vsComputer' name='players' value='vsComputer' defaultChecked />
              Human vs. Computer
            </label>
            <label onClick={() => setPlayers('vsHuman')}>
              <input type='radio' id='vsHuman' name='players' value='vsHuman' />
              Human vs. Human
            </label>
          </div>
          <div>
            <label>
              Name of first player: 
              <input type='text' value={options.playerNames[0]} onChange={setName1} />
            </label>
          </div>
          {options.humanVsHuman &&
            <div>
              <label>
              Name of second player: 
                <input type='text' value={options.playerNames[1]} onChange={setName2} />
              </label>
            </div>
          }
          <div>
            <h3>AI difficulty</h3>
            <label onClick={() => setDifficulty('hard')}>
              <input type='radio' id='easy' name='difficulty' value='easy' defaultChecked />
              Hard
            </label>
            <label onClick={() => setDifficulty('medium')}>
              <input type='radio' id='medium' name='difficulty' value='medium' />
              Medium
            </label>
            <label onClick={() => setDifficulty('easy')}>
              <input type='radio' id='easy' name='difficulty' value='easy' />
              Easy
            </label>
          </div>
          <div>
            <h3>Checker style: </h3>
            <label onClick={() => setMotif('checkers')}>
              <input type='radio' id='checkers' name='motif' value='checkers' defaultChecked />
              Checkers
            </label>
            <label onClick={() => setMotif('pets')}>
              <input type='radio' id='pets' name='motif' value='pets' />
              Pets
            </label>
            <label onClick={() => setMotif('drinks')}>
              <input type='radio' id='drinks' name='motif' value='drinks' />
              Drinks
            </label>
            <label onClick={() => setMotif('fantasy')}>
              <input type='radio' id='fantasy' name='motif' value='fantasy' />
              Fantasy
            </label>
            <label onClick={() => setMotif('ocean')}>
              <input type='radio' id='ocean' name='motif' value='ocean' />
              Ocean
            </label>
          </div>
        </div>
      }
    </>
  );
};

Settings.propTypes = {
  options: PropTypes.shape({
    playerNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    humanVsHuman: PropTypes.bool,
    computerFirst: PropTypes.bool,
    aiDifficulty: PropTypes.oneOf(['hard', 'medium', 'easy']),
    userMotif: PropTypes.oneOf(['default', 'pets', 'fantasy', 'drinks', 'ocean']),
  }).isRequired,
  handleNewOptions: PropTypes.func.isRequired,
  handleResetButton: PropTypes.func.isRequired,
};

export default Settings;
