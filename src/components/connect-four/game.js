import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Board from '../board/Board';

const ConnectFour = ({ playerNames }) => {
  const colors = ['red', 'black'];
  const rows = 6;
  const columns = 7;
  if(!playerNames) {
    playerNames = ['player1', 'player2'];
  }
  
  const initialBoard = Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const status = (row === rows - 1) ? 'valid' : 'open';
    return { id: `${col},${row}`, status };
  });

  const [board, setBoard] = useState(initialBoard);
  const [playerIndex, setPlayerIndex] = useState(0);

  const togglePlayer = () => playerIndex ? setPlayerIndex(0) : setPlayerIndex(1);

  const getAboveId = id => {
    const rowAbove = +id[2] - 1;
    return id[0] + id[1] + rowAbove;
  };

  const playSquare = id => {
    setBoard(board.map(square => {
      if(square.id === id) {
        return { ...square, status: colors[playerIndex] };
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
      togglePlayer();
    }
  };

  return (
    <>
      <p>{`${playerNames[playerIndex]}'s turn (${colors[playerIndex]})`}</p>
      <Board board={board} handleClick={handlePlay}/>
    </>
  );
};

ConnectFour.propTypes = {
  playerNames: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
};

export default ConnectFour;
