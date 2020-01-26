import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import styles from './Board.css';

const Board = ({ board, handleClick, motif }) => (
  <div className={styles.Board}>
    {board.map(square => (
      <Square key={square.id} {...square} handleClick={() => handleClick(square)} motif={motif} />
    ))}
  </div>
);

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['red', 'black', 'open', 'valid']).isRequired,
    }).isRequired
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  motif: PropTypes.string,
};

export default Board;
