import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checker.css';
import redChecker from '../../assets/redChecker.png';
import blackChecker from '../../assets/blackChecker.png';
import dog from '../../assets/dog.png';
import cat from '../../assets/cat.jpg';
import beer from '../../assets/beer.png';
import wine from '../../assets/wine.png';

const getPieceStyle = motif => {
  if(motif === 'pets') return [true, false, false];
  if(motif === 'drinks') return [false, true, false];
  return [false, false, true];
};
const makeStyle = src => ({ backgroundImage: `url(${src})` });

const Checker = ({ status, motif }) => {
  const [pets, drinks, checkers] = getPieceStyle(motif);

  const redPiece = (
    <>
      {checkers && <div style={makeStyle(redChecker)} className={`${styles.redChecker} ${styles.space} ${styles.red}`}></div>}
      {pets && <div style={makeStyle(dog)} className={`${styles.dog} ${styles.space} ${styles.red}`}></div>}
      {drinks && <div style={makeStyle(beer)} className={`${styles.beer} ${styles.space} ${styles.red}`}></div>}
    </>
  );
  const blackPiece = (
    <>
      {checkers && <div style={makeStyle(blackChecker)} className={`${styles.blackChecker} ${styles.space} ${styles.black}`}></div>}
      {pets && <div style={makeStyle(cat)} className={`${styles.cat} ${styles.space} ${styles.black}`}></div>}
      {drinks && <div style={makeStyle(wine)} className={`${styles.wine} ${styles.space} ${styles.black}`}></div>}
    </>
  );
  const openSpace = (
    <div className={styles.space}></div>
  );
  
  return (
    <section className={`${styles.Checker}`}>
      {status === 'red' && redPiece}
      {status === 'black' && blackPiece}
      {status === 'valid' && openSpace}
      {status === 'open' && openSpace}
    </section>
  );
};

Checker.propTypes = {
  status: PropTypes.oneOf(['red', 'black', 'open', 'valid']).isRequired,
  motif: PropTypes.string,
};

export default Checker;
