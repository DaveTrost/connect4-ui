import React from 'react';
import PropTypes from 'prop-types';
import { Connect4AI } from 'connect4-ai';
import Board from '../board/Board';
import useConnectFourLogic from './useConnectFourLogic';
import styles from './ConnectFour.css';
import connectFourTitle from '../../assets/connect-four-title.png';

const game = new Connect4AI();
const columns = 7;
const rows = 6;
const defaultPlayerNames = ['Player 1', 'Player 2'];
const getOptions = options => {
  let { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = options || {};
  humanVsHuman = humanVsHuman || false;
  computerFirst = computerFirst || false;
  aiDifficulty = aiDifficulty || 'medium';
  userMotif = userMotif || 'default';
  colors = ['red', 'black'];
  if(userMotif === 'ocean') colors = ['pink', 'blue'];
  playerNames = playerNames || defaultPlayerNames;    
  if(!humanVsHuman) {
    playerNames[computerFirst ? 0 : 1] = `Computer-${aiDifficulty}`;
  }
  return { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif };
};

const ConnectFour = ({ options }) => {
  const { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = getOptions(options);
  const { 
    infoMsg,
    updateInfoMsg,
    board,
    updateBoard,
    makeAiPlay,
    makeAiInfoMsg,
    aiThinking,
    gameOver,
    getColumn
  } = useConnectFourLogic(rows, columns, colors);
  // const [motif, setMotif] = useState(userMotif);
  
  if(game.getMoveCount() === 0 && computerFirst && !humanVsHuman) {
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  }

  const handlePlay = ({ id, status }) => {
    if(status !== 'valid' || gameOver || aiThinking) return;
    
    game.play(getColumn(id));
    const statusUpdate = game.gameStatus();
    updateInfoMsg(statusUpdate);
    updateBoard({ playedId: id, solution: statusUpdate.solution });
    
    if(humanVsHuman) return;
    if(statusUpdate.gameOver) return;
    
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  };

  return (
    <section className={styles.ConnectFour}>
      <img src={connectFourTitle} />
      <div>
        <h1>{`${playerNames[0]} - vs - ${playerNames[1]}`}</h1>
        <Board board={board} handleClick={handlePlay} motif={userMotif} />
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
        <h2>{infoMsg}</h2>
        {aiThinking && <h3>Computer is thinking ...</h3>}
      </div>
    </section>
  );
};

ConnectFour.propTypes = {
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

export default ConnectFour;
