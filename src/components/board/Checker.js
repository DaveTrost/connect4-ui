import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checker.css';

const getPieceStyle = motif => {
  if(motif === 'pets') return [true, false, false];
  if(motif === 'drinks') return [false, true, false];
  return [false, false, true];
};

const Checker = ({ color, motif }) => {
  const [catdog, drinks, checkers] = getPieceStyle(motif);

  const redPiece = (
    <>
      {checkers && <img src={'https://cdn0.iconfinder.com/data/icons/board-games-flat-1/48/Games_BoardGames_Artboard_14-512.png'} />}
      {drinks && <img className={styles.wine} src={'https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/wine-glass-icon-256.png'} />}
      {catdog && <img src={'https://png.pngtree.com/svg/20170117/dog_15395.png'} />}
    </>
  );
  const blackPiece = (
    <>
      {checkers && <img src={'https://cdn0.iconfinder.com/data/icons/board-games-colored-1/48/Games_BoardGames_Artboard_15-512.png'} />}
      {drinks && <img className={styles.beer} src={'https://www.spinningwheelinn.co.uk/wp-content/uploads/2014/04/red-beer-icon-h-200-w300.png'} />}
      {catdog && <img className={styles.cat} src={'https://icon-library.net/images/cat-icon-free/cat-icon-free-0.jpg'} />}
    </>
  );
  
  return (
    <section className={`${styles.Checker}`}>
      {color === 'red' ? redPiece : blackPiece}
    </section>
  );
};

Checker.propTypes = {
  color: PropTypes.string.isRequired,
  motif: PropTypes.string,
};

export default Checker;
