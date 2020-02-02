import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Connect4AI } from 'connect4-ai';
import Board from '../board/Board';
import useConnectFourLogic from './useConnectFourLogic';

const game = new Connect4AI();
const columns = 7;
const rows = 6;
const colors = ['red', 'black'];
const defaultPlayerNames = ['Player 1', 'Player 2'];
const getOptions = options => {
  let { playerNames, humanVsHuman, computerFirst, aiDifficulty, userMotif } = options || {};
  humanVsHuman = humanVsHuman || false;
  computerFirst = computerFirst || false;
  aiDifficulty = aiDifficulty || 'medium';
  userMotif = userMotif || 'default';
  playerNames = playerNames || defaultPlayerNames;    
  if(!humanVsHuman) {
    playerNames[computerFirst ? 0 : 1] = `Computer (${aiDifficulty})`;
  }
  return { playerNames, humanVsHuman, computerFirst, aiDifficulty, userMotif };
};

const ConnectFour = ({ options }) => {
  const { playerNames, humanVsHuman, computerFirst, aiDifficulty, userMotif } = getOptions(options);
  const { 
    status,
    updateStatus, 
    board, 
    updateBoard,
    makeAiPlay,
    makeAiStatus,
    aiThinking,
    gameOver, 
    getColumn 
  } = useConnectFourLogic(rows, columns, colors, playerNames);
  const [motif, setMotif] = useState(userMotif);
  
  if(game.getMoveCount() === 0 && computerFirst && !humanVsHuman) {
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiStatus(game.gameStatus());
  }

  const handlePlay = ({ id, status }) => {
    if(status !== 'valid' || gameOver || aiThinking) return;
    
    game.play(getColumn(id));
    const statusUpdate = game.gameStatus();
    updateStatus(statusUpdate);
    updateBoard({ playedId: id });
    
    if(humanVsHuman) return;
    if(statusUpdate.gameOver) return;

    makeAiPlay(game.playAI(aiDifficulty));
    makeAiStatus(game.gameStatus());
  };

  return (
    <>
      <h1>{`${playerNames[0]} vs. ${playerNames[1]}`}</h1>
      <p>{status}</p>
      <Board board={board} handleClick={handlePlay} motif={motif} />
      <p>Checker style: 
        <label onClick={() => setMotif('default')}>
          <input type='radio' id='default' name='motif' value='default' defaultChecked />
          Default
        </label>
        <label onClick={() => setMotif('pets')}>
          <input type='radio' id='pets' name='motif' value='pets' />
          Pets
        </label>
        <label onClick={() => setMotif('drinks')}>
          <input type='radio' id='drinks' name='motif' value='drinks' />
          Drinks
        </label>
      </p>
      {aiThinking && <p>Computer is thinking ...</p>}
    </>
  );
};

ConnectFour.propTypes = {
  options: PropTypes.shape({
    playerNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    humanVsHuman: PropTypes.bool,
    computerFirst: PropTypes.bool,
    aiDifficulty: PropTypes.oneOf(['hard', 'medium', 'easy']),
    userMotif: PropTypes.oneOf(['default', 'pets', 'drinks']),
  })
};

export default ConnectFour;
