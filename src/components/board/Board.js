import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import styles from './Board.css';

const Board = ({ board, handleClick }) => (
  <div className={styles.Board}>
    {board.map(square => (
      <Square key={square.id} {...square} handleClick={() => handleClick(square)} />
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
  handleClick: PropTypes.func.isRequired
};

export default Board;