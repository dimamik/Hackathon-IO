import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContext } from '../../context/Context';
import { scCreatedParams, MapContextType } from '../../types';
import './Configuration.css';

const create = (
  {
    gameConfig: { maxPoints, time, width, height },
    mapState: { socket },
    setRoomId,
  }: MapContextType,
  callback: () => void,
) => {
  socket?.emit('create', {
    width,
    height,
    maxPoints,
    maxTime: time,
    quizParams: {
      question: '',
      answers: [],
    },
    isLocal: false,
  });

  socket?.on('created', (params: scCreatedParams) => {
    console.log('received created', params.roomID);
    setRoomId!(params.roomID);
    callback();
  });
};

function ConfigurationScreen() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [maxPoints, setMaxPoints] = useState(10);
  const [time, setTime] = useState(10);
  const [multiplayer, setMultiplayer] = useState(false);
  const context = useContext(MapContext);
  const { mapState, setRoomId, setShouldShowModal } = context;
  const navigate = useNavigate();

  const onClick = () => {
    setShouldShowModal(true);
    create(context, () => navigate('/board'));
  };

  const isValid = true || (width && height && maxPoints && time);
  return (
    <form>
      <div className="background">
        <div className="settingsWindow">
          <div className="bar">
            <div className="barTitle">
              <div>[１]　C o n f i g u r a t i o n</div>
            </div>
            <div className="closeIcon">X</div>
          </div>
          <div className="internalWindow">
            <div className="settingTitle">
              <p>【Map size】</p>
            </div>
            <div className="verticalSettingOptions">
              <div className="inputRow">
                <p>Width</p>
                <input
                  type="text"
                  defaultValue={width}
                  onChange={e => setWidth(Number(e.target.value))}></input>
              </div>
              <div className="inputRow">
                <p>Height</p>
                <input
                  type="text"
                  defaultValue={height}
                  onChange={e => setHeight(Number(e.target.value))}></input>
              </div>
            </div>
            <div className="settingTitle">
              <p>【Parameters】</p>
            </div>
            <div className="verticalSettingOptions">
              <div className="inputRow">
                <p>Max points</p>
                <input
                  type="text"
                  defaultValue={maxPoints}
                  onChange={e => setMaxPoints(Number(e.target.value))}></input>
              </div>
              <div className="inputRow">
                <p>Time for move</p>
                <input
                  defaultValue={time}
                  type="text"
                  onChange={e => setTime(Number(e.target.value))}></input>
              </div>
              <div className="inputRow">
                <div>Ｍｕｌｔｉｐｌａｙｅｒ</div>
                <input
                  type="checkbox"
                  onChange={e => setMultiplayer(e.target.checked)}></input>
              </div>
            </div>
            <div className="buttonContainer">
              <button
                type="button"
                className="playButton"
                disabled={!isValid}
                onClick={onClick}>
                P l a y
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ConfigurationScreen;
