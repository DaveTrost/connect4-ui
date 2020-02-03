import { useState, useEffect } from 'react';

const makeMessage = color => `${color}'s turn`;
const makeId = (col, row) => `${col},${row}`;
const getRow = id => +id[2];
const getColumn = id => +id[0];
const getAboveId = id => makeId(getColumn(id), getRow(id) - 1);

export default (rows, columns, colors) => {
  const initialInfoMsg = makeMessage(colors[0]);
  const initialBoard = Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const status = (row === rows - 1) ? 'valid' : 'open';
    return { id: makeId(col, row), status };
  });
  const [infoMsg, setInfoMsg] = useState(initialInfoMsg);
  const [board, setBoard] = useState(initialBoard);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameOver, endGame] = useState(false);
  const [aiPlay, setAiPlay] = useState(null);
  const [aiInfoMsg, setAiInfoMsg] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);

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

  const updateInfoMsg = ({ gameOver, winner }) => {
    if(gameOver) {
      endGame(true);
      setInfoMsg(winner ?
        `${getPlayerColor()} wins!` :
        'Game Over. It is a draw.'
      );
    }
    else {
      const nextPlayerIndex = playerIndex ? 0 : 1;
      setPlayerIndex(nextPlayerIndex);
      setInfoMsg(makeMessage(colors[nextPlayerIndex]));
    }
  };

  const makeAiPlay = play => setAiPlay(play);
  const makeAiInfoMsg = info => setAiInfoMsg(info);

  useEffect(() => {
    if(aiPlay !== null) {
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setAiPlay(null);
      }, 1000);
      return () => {
        const { id, status } = board.find(({ id, status }) => (getColumn(id) === aiPlay) && (status === 'valid'));
        if(status !== 'valid') return;

        updateInfoMsg(aiInfoMsg);
        updateBoard({ playedId: id });
      };
    }
  }, [aiPlay]);

  return {
    infoMsg,
    updateInfoMsg,
    board,
    updateBoard,
    makeAiPlay,
    makeAiInfoMsg,
    aiThinking,
    gameOver,
    getColumn,
  };
};
