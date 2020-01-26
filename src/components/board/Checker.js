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

const Checker = ({ status, motif }) => {
  const [pets, drinks, checkers] = getPieceStyle(motif);

  const redPiece = (
    <>
      {checkers && <img src={redChecker} />}
      {pets && <img src={dog} />}
      {drinks && <img className={styles.beer} src={beer} />}
    </>
  );
  const blackPiece = (
    <>
      {checkers && <img src={blackChecker} />}
      {pets && <img className={styles.cat} src={cat} />}
      {drinks && <img className={styles.wine} src={wine} />}
    </>
  );
  const openSpace = (
    <div className={styles.openSpace}></div>
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
