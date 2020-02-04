import React from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.css';

// const getOptions = options => {
//   const defaultPlayerNames = ['Player 1', 'Player 2'];
//   let { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = options || {};
//   humanVsHuman = humanVsHuman || false;
//   computerFirst = computerFirst || false;
//   aiDifficulty = aiDifficulty || 'medium';
//   userMotif = userMotif || 'default';
//   colors = ['red', 'black'];
//   if(userMotif === 'ocean') colors = ['pink', 'blue'];
//   playerNames = playerNames || defaultPlayerNames;    
//   if(!humanVsHuman) {
//     playerNames[computerFirst ? 0 : 1] = 'Computer';
//   }
//   return { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif };
// };

const Settings = () => {
// const Settings = ({ options }) => {
  // options = getOptions();
  // const [motif, setMotif] = useState(userMotif);
  
  return (
    <div className={styles.Settings}>
      <button>New Game</button>
      <button>Settings</button>
      {/* <p>Checker style: 
        <label onClick={() => setMotif('default')}>
        <input type='radio' id='default' name='motif' value='default' defaultChecked />
        Default
        </label>
        <label onClick={() => setMotif('pets')}>
        <input type='radio' id='pets' name='motif' value='pets' />
        Pets
        </label>
        <label onClick={() => setMotif('drinks')}>
        <input type='radio' id='drinks' name='motif' value='drinks' />
        Drinks
        </label>
      </p> */}
    </div>
  );
};

Settings.propTypes = {
  options: PropTypes.shape({
    playerNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    humanVsHuman: PropTypes.bool,
    computerFirst: PropTypes.bool,
    aiDifficulty: PropTypes.oneOf(['hard', 'medium', 'easy']),
    userMotif: PropTypes.oneOf(['default', 'pets', 'fantasy', 'drinks', 'ocean']),
  })
};

export default Settings;
