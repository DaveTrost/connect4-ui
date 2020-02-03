import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checker.css';
import redChecker from '../../assets/redChecker.png';
import blackChecker from '../../assets/blackChecker.png';
import dog from '../../assets/dog.png';
import cat from '../../assets/cat.jpg';
import beer from '../../assets/beer.png';
import wine from '../../assets/wine.png';
import mermaid from '../../assets/mermaid-red.jpg';
import unicorn from '../../assets/unicorn-black-rainbow.jpg';
import oceanBlue from '../../assets/ocean-blue.jpg';
import oceanPink from '../../assets/ocean-pink.jpg';

const getPieceStyle = motif => {
  const motifReference = {
    checkers: false,
    pets: false,
    drinks: false,
    fantasy: false,
    ocean: false,
  };
  if(motifReference[motif] === false) {
    motifReference[motif] = true;
  }
  else {
    motifReference.checkers = true;
  }
  return motifReference;
};
const makeStyle = src => ({ backgroundImage: `url(${src})` });

const Checker = ({ status, motif, isSolution }) => {
  const { checkers, pets, drinks, fantasy, ocean } = getPieceStyle(motif);

  const redPiece = (
    <>
      {checkers && <div style={makeStyle(redChecker)} className={`${styles.redChecker} ${isSolution ? styles.isSolution : ''}`}></div>}
      {pets && <div style={makeStyle(dog)} className={`${styles.dog} ${isSolution ? styles.isSolution : ''}`}></div>}
      {drinks && <div style={makeStyle(beer)} className={`${styles.beer} ${isSolution ? styles.isSolution : ''}`}></div>}
      {fantasy && <div style={makeStyle(mermaid)} className={`${styles.mermaid} ${isSolution ? styles.isSolution : ''}`}></div>}
      {ocean && <div style={makeStyle(oceanPink)} className={`${styles.shark} ${isSolution ? styles.isSolution : ''}`}></div>}
    </>
  );
  const blackPiece = (
    <>
      {checkers && <div style={makeStyle(blackChecker)} className={`${styles.blackChecker} ${isSolution ? styles.isSolution : ''}`}></div>}
      {pets && <div style={makeStyle(cat)} className={`${styles.cat} ${isSolution ? styles.isSolution : ''}`}></div>}
      {drinks && <div style={makeStyle(wine)} className={`${styles.wine} ${isSolution ? styles.isSolution : ''}`}></div>}
      {fantasy && <div style={makeStyle(unicorn)} className={`${styles.unicorn} ${isSolution ? styles.isSolution : ''}`}></div>}
      {ocean && <div style={makeStyle(oceanBlue)} className={`${styles.narwhal} ${isSolution ? styles.isSolution : ''}`}></div>}
    </>
  );
  const openSpace = (
    <div></div> 
  );
  
  return (
    <section className={styles.Checker}>
      {status === 'red' && redPiece}
      {status === 'pink' && redPiece}
      {status === 'black' && blackPiece}
      {status === 'blue' && blackPiece}
      {status === 'valid' && openSpace}
      {status === 'open' && openSpace}
    </section>
  );
};

Checker.propTypes = {
  status: PropTypes.oneOf(['red', 'black', 'pink', 'blue', 'open', 'valid']).isRequired,
  isSolution: PropTypes.bool,
  motif: PropTypes.string,
};

export default Checker;
