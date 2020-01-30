import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Board from '../board/Board';
import Connect4 from 'connect4-ai';

const game = new Connect4();

const ConnectFour = ({ playerNames }) => {
  const colors = ['red', 'black'];
  const columns = 7;
  const rows = 6;
  const activeGame = '';
  if(!playerNames) {
    playerNames = ['player 1', 'player 2'];
  }

  const togglePlayer = () => playerIndex ? setPlayerIndex(0) : setPlayerIndex(1);
  const getPlayerName = () => playerNames[playerIndex];
  const getPlayerColor = () => colors[playerIndex];
  const gameIsActive = () => gameResult === activeGame;
  
  const makeId = (col, row) => `${col},${row}`;
  const getRow = id => +id[2];
  const getColumn = id => +id[0];
  const getAboveId = id => makeId(getColumn(id), getRow(id) - 1);

  const initialBoard = Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const status = (row === rows - 1) ? 'valid' : 'open';
    return { id: makeId(col, row), status };
  });

  const [board, setBoard] = useState(initialBoard);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameResult, setGameResult] = useState(activeGame);
  const [motif, setMotif] = useState('default');

  const playSquare = id => {
    setBoard(board.map(square => {
      if(square.id === id) {
        return { ...square, status: getPlayerColor() };
      } 
      if(square.id === getAboveId(id)) {
        return { ...square, status: 'valid' };
      }
      return square;
    }));
  };

  const handlePlay = ({ status, id }) => {
    if(status === 'valid') {
      playSquare(id);
      game.play(getColumn(id));
      const { gameOver, winner } = game.gameStatus();
      if(gameOver && winner) {
        return setGameResult(`${getPlayerName()} (${getPlayerColor()}) wins!`);
      }
      if(gameOver) {
        return setGameResult('It is a draw.');
      }
      togglePlayer();
    }
  };

  return (
    <>
      {gameResult ?
        (<p>{`${gameResult} --- GAME OVER. `}</p>) :
        (<p>{`${getPlayerName()}'s turn (${getPlayerColor()})`}</p>)
      }
      <Board board={board} active={gameIsActive()} handleClick={handlePlay} motif={motif} />
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
