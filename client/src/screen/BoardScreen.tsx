import { useContext, useState } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board';
import PlayerStats from '../components/Statistics/PlayerStats';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Question from '../components/QuestionComponents';
import './BoardScreen.css';
import WaitingForPlayer from '../components/WaitingForPlayer';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const location = useLocation();
  const props: BoardProps = location.state; // TODO: ???????

  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }
  const [isWaitingOpen, setIsWaitingOpen] = useState(true);
  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }

  const { setMapState } = useContext(MapContext);
  return (
    <div className="board-container">
      <PlayerStats />
      <div className="grey-border">
        <div className="white-border">
          <div className="grey-border">
            <div className="violet-border">
              <Board width={props.width} height={props.height} />
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
