import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board';
import { mapStateMock } from '../types/BoardTypes';
import './BoardScreen.css';
import PlayerStats from '../components/Statistics/PlayerStats';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Question from '../components/QuestionComponents';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const location = useLocation();
  const props: BoardProps = location.state;

  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
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
      <button onClick={toggleModal}>Toggle modal</button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} className="mymodal">
        <Question />
      </Modal>
    </div>
  );
}

export default BoardScreen;
