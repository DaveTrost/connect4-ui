import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Board from '../board/Board';
import Connect4 from 'connect4-ai';

const game = new Connect4();

const ConnectFour = ({ playerNames }) => {
  const colors = ['red', 'black'];
  const columns = 7;
  const rows = 6;
  if(!playerNames) {
    playerNames = ['player 1', 'player 2'];
  }

  const getPlayerName = () => playerNames[playerIndex];
  const getPlayerColor = () => colors[playerIndex];
  
  const makeDisplay = (name, color) => `${name}'s turn (${color})`;
  const makeId = (col, row) => `${col},${row}`;
  const getRow = id => +id[2];
  const getColumn = id => +id[0];
  const getAboveId = id => makeId(getColumn(id), getRow(id) - 1);

  const initialStatus = makeDisplay(playerNames[0], colors[0]);
  const initialBoard = Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const status = (row === rows - 1) ? 'valid' : 'open';
    return { id: makeId(col, row), status };
  });
  
  const [status, setStatus] = useState(initialStatus);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameOver, endGame] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [motif, setMotif] = useState('default');
  
  useEffect(() => {
    if(gameOver) {
      setBoard(board.map(square => ({ 
        ...square, 
        status: (square.status === 'valid') ? 'open' : square.status
      })));
    }
  }, [gameOver]);

  const updateBoard = ({ playedId }) => {
    setBoard(board.map(square => {
      if(square.id === playedId) {
        return { ...square, status: getPlayerColor() };
      } 
      if(square.id === getAboveId(playedId)) {
        return { ...square, status: 'valid' };
      }
      return square;
    }));
  };

  const updateStatus = ({ gameOver, winner }) => {
    if(gameOver) {
      endGame(true);
      setStatus(winner ?
        `${getPlayerName()} (${getPlayerColor()}) wins!` :
        'Game Over. It is a draw.'
      );
    }
    else {
      const nextPlayerIndex = playerIndex ? 0 : 1;
      setPlayerIndex(nextPlayerIndex);
      setStatus(makeDisplay(playerNames[nextPlayerIndex], colors[nextPlayerIndex]));
    }
  };

  const handlePlay = ({ id }) => {
    if(!game.canPlay(getColumn(id)) || gameOver) return;
    
    game.play(getColumn(id));
    updateStatus(game.gameStatus());
    updateBoard({ playedId: id });
  };

  return (
    <>
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
    </>
  );
};

ConnectFour.propTypes = {
  playerNames: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
};

export default ConnectFour;
