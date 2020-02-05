import React, { useState } from 'react';
import connectFourTitle from '../../assets/connect-four-title.png';
import ConnectFour from '../connect-four/ConnectFour';
import Settings from './Settings';
import styles from './GameArea.css';

const getOptions = options => {
  const defaultPlayerNames = ['Player 1', 'Player 2'];
  let { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = options || {};
  humanVsHuman = humanVsHuman || false;
  computerFirst = computerFirst || false;
  aiDifficulty = aiDifficulty || 'medium';
  userMotif = userMotif || 'checkers';
  colors = ['red', 'black'];
  if(userMotif === 'unicorns') colors = ['white', 'black'];
  if(userMotif === 'ocean') colors = ['red', 'blue'];
  playerNames = playerNames || defaultPlayerNames;    
  if(!humanVsHuman) {
    playerNames[computerFirst ? 0 : 1] = 'Computer';
  }
  return { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif };
};

const GameArea = () => {
  const initialOptions = getOptions();

  const [resetFlag, setResetFlag] = useState(false);
  const [options, setOptions] = useState(initialOptions);

  const handleNewOptions = options => setOptions(getOptions(options));
  const handleResetGame = () => setResetFlag(false);
  const handleResetButton = () => setResetFlag(true);

  return (
    <section className={styles.GameArea}>
      <img src={connectFourTitle} />
      <ConnectFour options={options} resetGame={resetFlag} handleResetGame={handleResetGame} />
      <Settings options={options} handleNewOptions={handleNewOptions} handleResetButton={handleResetButton} />
    </section>
  );
};

export default GameArea;
