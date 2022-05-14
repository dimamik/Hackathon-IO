import { useContext } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board';
import PlayerStats from '../components/Statistics/PlayerStats';
import { useLocation } from 'react-router-dom';
import './BoardScreen.css';

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const location = useLocation();
  const props: BoardProps = location.state; // TODO: ???????

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
    </div>
  );
}

export default BoardScreen;
