import React from 'react';
import PropTypes from 'prop-types';
import { Connect4AI } from 'connect4-ai';
import Board from '../board/Board';
import useConnectFourLogic from './useConnectFourLogic';
import styles from './ConnectFour.css';

const game = new Connect4AI();
const columns = 7;
const rows = 6;

const ConnectFour = ({ options, resetGame, handleResetGame }) => {
  const { 
    playerNames, 
    colors, 
    humanVsHuman, 
    computerFirst, 
    aiDifficulty, 
    userMotif
  } = options;
  const { 
    infoMsg,
    updateInfoMsg,
    board,
    updateBoard,
    makeAiPlay,
    makeAiInfoMsg,
    aiThinking,
    gameOver,
    newGame,
    getColumn
  } = useConnectFourLogic(rows, columns, colors);
  
  if(resetGame && game.getMoveCount() > 0) {
    game.reset();
    newGame();
    handleResetGame();
  }

  if(game.getMoveCount() === 0 && computerFirst && !humanVsHuman) {
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  }

  const handlePlay = ({ id, status }) => {
    if(status !== 'valid' || gameOver || aiThinking) return;
    
    game.play(getColumn(id));
    const statusUpdate = game.gameStatus();
    updateInfoMsg(statusUpdate);
    updateBoard({ playedId: id, solution: statusUpdate.solution });
    
    if(humanVsHuman) return;
    if(statusUpdate.gameOver) return;
    
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  };

  return (
    <div className={styles.ConnectFour}>
      <h1>{`${playerNames[0]} vs. ${playerNames[1]}`}</h1>
      <Board board={board} handleClick={handlePlay} motif={userMotif} />
      <h2>Status: {infoMsg}</h2>
      {aiThinking && <h3>Computer is thinking ...</h3>}
    </div>
  );
};

ConnectFour.propTypes = {
  options: PropTypes.shape({
    playerNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    colors: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    humanVsHuman: PropTypes.bool,
    computerFirst: PropTypes.bool,
    aiDifficulty: PropTypes.oneOf(['hard', 'medium', 'easy']),
    userMotif: PropTypes.oneOf(['checkers', 'pets', 'unicorns', 'drinks', 'ocean']),
  }),
  resetGame: PropTypes.bool,
  handleResetGame: PropTypes.func.isRequired,
};

export default ConnectFour;
