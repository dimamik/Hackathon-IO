import { useContext, useState } from 'react';
import { MapContext } from '../../context/Context';
import Board from '../../components/Board/Board';
import PlayerStats from '../../components/Statistics/PlayerStats';
import Modal from 'react-modal';
import Question from '../../components/Modals/QuestionComponents';
import './BoardScreen.css';
import { csRoundParams } from '../../types';
import WaitingForPlayer from '../../components/Modals/WaitingForPlayer';
import context from 'react-bootstrap/esm/AccordionContext';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const { mapState, setParams } = useContext(MapContext);

  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }
  const [isWaitingOpen, setIsWaitingOpen] = useState(true);
  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }

  mapState.socket?.on('round', (ev: csRoundParams) => {
    setParams(ev);
    // TODO: wypierdolic modal z oczekiwaniem
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
      <button onClick={toggleWaitingModal}>Toggle modal</button>
      <Modal isOpen={isQuestionOpen} onRequestClose={toggleQuestionModal} className="mymodal">
        <Question />
      </Modal>
      <Modal isOpen={isWaitingOpen} onRequestClose={toggleWaitingModal} className="mymodal">
        <WaitingForPlayer />
      </Modal>
    </div>
  );
}

export default BoardScreen;
