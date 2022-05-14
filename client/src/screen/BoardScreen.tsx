import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board';
import { mapStateMock } from '../types/BoardTypes';
import './BoardScreen.css';
import PlayerStats from '../components/Statistics/PlayerStats';
import { useLocation } from 'react-router-dom';

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const location = useLocation();
  const props: BoardProps = location.state;

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
    </div>
  );
}

export default BoardScreen;
