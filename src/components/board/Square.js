import React from 'react';
import PropTypes from 'prop-types';
import styles from './Square.css';
import Checker from './Checker';

const Square = ({ id, status, selected, handleClick }) => (
  <section 
    key={ id }
    className={`
      ${styles.Square} 
      ${(status === 'valid' && selected) ? styles.highlight : ''}
      ${(status === 'valid') ? styles.valid : ''}
    `}
    onClick={handleClick}
  >
    {status === 'red' && <Checker color='red'/>}
    {status === 'black' && <Checker color='black'/>}
  </section>
);

Square.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['red', 'black', 'open', 'valid']).isRequired,
  selected: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

export default Square;
