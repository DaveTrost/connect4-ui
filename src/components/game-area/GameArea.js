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
  userMotif = userMotif || 'default';
  colors = ['red', 'black'];
  if(userMotif === 'ocean') colors = ['pink', 'blue'];
  playerNames = playerNames || defaultPlayerNames;    
  if(!humanVsHuman) {
    playerNames[computerFirst ? 0 : 1] = 'Computer';
  }
  return { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif };
};

const GameArea = () => {
  const [resetFlag, setResetFlag] = useState(false);

  let options = getOptions();
  
  options = {
    playerNames: ['Player 1', 'Player 2'],
    humanVsHuman: false,
    computerFirst: false,
    aiDifficulty: 'hard',
    userMotif: 'default',
  };

  return (
    <section className={styles.GameArea}>
      <img src={connectFourTitle} />
      <ConnectFour options={options} resetGame={resetFlag} handleResetGame={() => setResetFlag(false)} />
      <Settings handleResetButton={() => setResetFlag(true)} />
    </section>
  );
};

export default GameArea;
