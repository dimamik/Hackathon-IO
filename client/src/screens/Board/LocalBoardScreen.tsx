import { useContext, useState } from 'react';
import { MapContext, SecondPlayerMapContext } from '../../context/Context';
import Board from '../../components/Board/Board';
import PlayerStats from '../../components/Statistics/PlayerStats';
import Modal from 'react-modal';
import Question from '../../components/Modals/QuestionComponents';
import './BoardScreen.css';
import './LocalBoardScreen.css';
import { csRoundParams } from '../../types';
import WaitingForPlayer from '../../components/Modals/WaitingForPlayer';
import GameOver from '../../components/Modals/GameOverComponts';
import context from 'react-bootstrap/esm/AccordionContext';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function LocalBoardScreen() {
  const firstPlayerMapState = useContext(MapContext);
  const secondPlayerMapState = useContext(SecondPlayerMapContext);

  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);
  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }
  const [isGameOver, setIsGameOver] = useState(false);
  function toggleGameOverModal() {
    setIsGameOver(!isGameOver);
  }

  const firstPlayerBoard = <Board contextInstance={MapContext} />;
  const secondPlayerBoard = <Board contextInstance={SecondPlayerMapContext} />;

  firstPlayerMapState.mapState.socket?.on('round', (ev: csRoundParams) => {
    firstPlayerMapState.setParams(ev);
    // TODO: wypierdolic modal z oczekiwaniem
    const displayStyle = ev.isMyMove ? '1' : '-1';
    document
      .querySelector('#first-player-board-container')
      ?.setAttribute('style', `z-index: ${displayStyle};`);
  });

  secondPlayerMapState.mapState.socket?.on('round', (ev: csRoundParams) => {
    secondPlayerMapState.setParams(ev);
    const displayStyle = ev.isMyMove ? '1' : '-1';
    document
      .querySelector('#second-player-board-container')
      ?.setAttribute('style', `z-index: ${displayStyle};`);
  });

  return (
    <div className="board-container">
      <PlayerStats />
      <div className="grey-border">
        <div className="white-border">
          <div className="grey-border">
            <div className="violet-border">
              <div className="multiple-boards-container">
                <div id="first-player-board-container">{firstPlayerBoard}</div>
                <div id="second-player-board-container">{secondPlayerBoard}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      &nbsp;
      <br />
      <button onClick={toggleWaitingModal}>Toggle modal</button>
      <Modal isOpen={isQuestionOpen} onRequestClose={toggleQuestionModal} className="mymodal">
        <Question />
      </Modal>
      <Modal isOpen={isGameOver} onRequestClose={toggleGameOverModal} className="mymodal">
        <GameOver />
      </Modal>
    </div>
  );
}

export default LocalBoardScreen;
