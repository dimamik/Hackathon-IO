import { useContext, useState } from 'react';
import { MapContext } from '../../context/Context';
import Board from '../../components/Board/Board';
import PlayerStats from '../../components/Statistics/PlayerStats';
import Modal from 'react-modal';
import Question from '../../components/Modals/QuestionComponents';
import './BoardScreen.css';
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

function BoardScreen() {
  const { mapState, setParams, gameConfig } = useContext(MapContext);

  const [isQuestionOpen, setIsQuestionOpen] = useState(true);
  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }

  const [isWaitingOpen, setIsWaitingOpen] = useState(gameConfig.shouldShowModal);
  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }
  const [isGameOver, setIsGameOver] = useState(false);
  function toggleGameOverModal() {
    setIsGameOver(!isGameOver);
  }

  mapState.socket?.on('round', (ev: csRoundParams) => {
    setIsWaitingOpen(false);
    setParams(ev, false);
  });

  return (
    <div className="board-container">
      <PlayerStats />
      <div className="grey-border">
        <div className="white-border">
          <div className="grey-border">
            <div className="violet-border">
              <Board />
            </div>
          </div>
        </div>
      </div>
      <br />
      &nbsp;
      <br />
      <Modal isOpen={isQuestionOpen} onRequestClose={toggleQuestionModal} className="mymodal">
        <Question />
      </Modal>
      <Modal isOpen={isWaitingOpen} onRequestClose={toggleWaitingModal} className="mymodal">
        <WaitingForPlayer roomID={mapState.roomID} />
      </Modal>
      <Modal isOpen={isGameOver} onRequestClose={toggleGameOverModal} className="mymodal">
        <GameOver />
      </Modal>
    </div>
  );
}

export default BoardScreen;
