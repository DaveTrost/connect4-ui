import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.css';

const Settings = ({ options, handleNewOptions, handleResetButton }) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);
  const setName1 = ({ target }) => handleNewOptions({ ...options, playerNames: [target.value, options.playerNames[1]] });
  const setName2 = ({ target }) => handleNewOptions({ ...options, playerNames: [options.playerNames[0], target.value] });
  const setDifficulty = aiDifficulty => handleNewOptions({ ...options, aiDifficulty });
  const setMotif = userMotif => handleNewOptions({ ...options, userMotif });
  const handleHumanVsHuman = ({ target }) => {
    const playerNames = target.checked ? [options.playerNames[0], 'Player 2'] : options.playerNames;
    return handleNewOptions({ ...options, playerNames, humanVsHuman: target.checked });
  };

  return (
    <>
      <div className={styles.settings}>
        <button className={styles.button} onClick={handleResetButton}>New Game</button>
        <button className={styles.button} onClick={toggleSettings}>Settings</button>
      </div>
      {showSettings &&
        <div className={styles.settingsPanel}>
          <h3>Players</h3>
          <div>
            <label>
              Player 1 name: 
              <input type='text' value={options.playerNames[0]} onChange={setName1} />
            </label>
          </div>
          <div>
            <label>
              <input type='checkbox' checked={options.humanVsHuman} name='humanVsHuman' onChange={handleHumanVsHuman} />
              2 player game
            </label>
          </div>
          {options.humanVsHuman &&
            <div>
              <label>
                Player 2 name: 
                <input type='text' value={options.playerNames[1]} onChange={setName2} />
              </label>
            </div>
          }
          <h3>Computer Difficulty</h3>
          {!options.humanVsHuman &&
            <div className={styles.radioList}>
              <label>
                <input 
                  type='radio' id='hard' name='difficulty' value='hard' 
                  checked={options.aiDifficulty === 'hard'} 
                  onChange={() => setDifficulty('hard')} 
                />
                Hard
              </label>
              <label>
                <input 
                  type='radio' id='medium' name='difficulty' value='medium' 
                  checked={options.aiDifficulty === 'medium'}
                  onChange={() => setDifficulty('medium')}
                />
                Medium
              </label>
              <label>
                <input 
                  type='radio' id='easy' name='difficulty' value='easy' 
                  checked={options.aiDifficulty === 'easy'} 
                  onChange={() => setDifficulty('easy')}
                />
                Easy
              </label>
            </div>
          }
          {options.humanVsHuman && 
            <p>N/A</p>
          }
          <h3>Checker Style</h3>
          <div className={styles.radioList}>
            <label>
              <input 
                type='radio' id='checkers' name='motif' value='checkers' 
                checked={options.userMotif === 'checkers'} 
                onChange={() => setMotif('checkers')}
              />
              Checkers
            </label>
            <label>
              <input 
                type='radio' id='pets' name='motif' value='pets' 
                checked={options.userMotif === 'pets'} 
                onChange={() => setMotif('pets')}
              />
              Pets
            </label>
            <label>
              <input 
                type='radio' id='drinks' name='motif' value='drinks' 
                checked={options.userMotif === 'drinks'} 
                onChange={() => setMotif('drinks')}
              />
              Drinks
            </label>
            <label>
              <input 
                type='radio' id='unicorns' name='motif' value='unicorns' 
                checked={options.userMotif === 'unicorns'} 
                onChange={() => setMotif('unicorns')}
              />
              Unicorns
            </label>
            <label>
              <input 
                type='radio' id='ocean' name='motif' value='ocean' 
                checked={options.userMotif === 'ocean'} 
                onChange={() => setMotif('ocean')}
              />
              Ocean
            </label>
          </div>
          <div>
            <button className={styles.button} onClick={toggleSettings}>OK</button>
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
    userMotif: PropTypes.oneOf(['checkers', 'pets', 'unicorns', 'drinks', 'ocean']),
  }).isRequired,
  handleNewOptions: PropTypes.func.isRequired,
  handleResetButton: PropTypes.func.isRequired,
};

export default Settings;
