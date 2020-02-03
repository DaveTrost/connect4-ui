import React from 'react';
import PropTypes from 'prop-types';
import styles from './Square.css';
import Checker from './Checker';

const Square = ({ id, status, isSolution, handleClick, motif }) => (
  <section 
    key={ id }
    className={`${styles.Square} ${(status === 'valid') ? styles.valid : ''}`}
    onClick={handleClick}
  >
    <Checker status={status} isSolution={isSolution} motif={motif}/>
  </section>
);

Square.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['red', 'black', 'open', 'valid']).isRequired,
  isSolution: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  motif: PropTypes.string,
};

export default Square;
