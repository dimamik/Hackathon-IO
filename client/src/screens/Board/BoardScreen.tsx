import { useContext, useState } from 'react';
import { MapContext } from '../../context/Context';
import Board from '../../components/Board/Board';
import PlayerStats from '../../components/Statistics/PlayerStats';
import Modal from 'react-modal';
import Question from '../../components/Modals/QuestionComponents';
import './BoardScreen.css';
import { csRoundParams } from '../../types';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const { mapState, setParams } = useContext(MapContext);

  mapState.socket?.on('round', (ev: csRoundParams) => {
    setParams(ev);
    // TODO: wypierdolic modal z oczekiwaniem
  });

  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
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
      <button onClick={toggleModal}>Toggle modal</button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} className="mymodal">
        <Question />
      </Modal>
    </div>
  );
}

export default BoardScreen;
