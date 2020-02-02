import { useState, useEffect } from 'react';

const makeDisplay = (name, color) => `${name}'s turn (${color})`;
const makeId = (col, row) => `${col},${row}`;
const getRow = id => +id[2];
const getColumn = id => +id[0];
const getAboveId = id => makeId(getColumn(id), getRow(id) - 1);

export default (rows, columns, colors, playerNames) => {
  const initialStatus = makeDisplay(playerNames[0], colors[0]);
  const initialBoard = Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const status = (row === rows - 1) ? 'valid' : 'open';
    return { id: makeId(col, row), status };
  });
  const [status, setStatus] = useState(initialStatus);
  const [board, setBoard] = useState(initialBoard);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameOver, endGame] = useState(false);
  const [aiPlay, setAiPlay] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);

  const getPlayerName = () => playerNames[playerIndex];
  const getPlayerColor = () => colors[playerIndex];

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

  const makeAiPlay = play => setAiPlay(play);
  const makeAiStatus = status => setAiStatus(status);

  useEffect(() => {
    if(aiPlay !== null) {
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setAiPlay(null);
      }, 1000);
      return () => {
        const { id, status: squareStatus } = board.find(({ id, status }) => (getColumn(id) === aiPlay) && (status === 'valid'));
        if(squareStatus !== 'valid') return;

        updateStatus(aiStatus);
        updateBoard({ playedId: id });
      };
    }
  }, [aiPlay]);

  return {
    status,
    updateStatus,
    board,
    updateBoard,
    makeAiPlay,
    makeAiStatus,
    aiThinking,
    gameOver,
    getColumn,
  };
};
