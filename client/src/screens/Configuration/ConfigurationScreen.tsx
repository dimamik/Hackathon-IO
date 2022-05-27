import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContext, SecondPlayerMapContext } from '../../context/Context';
import { scCreatedParams, MapContextType } from '../../types';
import './Configuration.css';

const createLocal = (
  {
    gameConfig: { maxPoints, time, width, height },
    mapState: { socket },
    setRoomId,
    setPlayerID,
  }: MapContextType,
  secondPlayerMapState: MapContextType,
  callback: () => void,
) => {
  socket?.emit('create', {
    width,
    height,
    maxPoints,
    maxTime: time,
    isLocal: false,
  });

  socket?.on('created', async (params: scCreatedParams) => {
    await setRoomId(params.roomID);
    await setPlayerID(0);
    await secondPlayerMapState.setRoomId(params.roomID);
    await secondPlayerMapState.setPlayerID(1);

    secondPlayerMapState.mapState.socket?.emit('join', {
      roomID: params.roomID,
    });
    callback();
  });
};

const create = (
  {
    gameConfig: { maxPoints, time, width, height },
    mapState: { socket },
    setRoomId,
    setShouldShowModal,
    setPlayerID,
  }: MapContextType,
  callback: () => void,
) => {
  setShouldShowModal(true);
  socket?.emit('create', {
    width,
    height,
    maxPoints,
    maxTime: time,
    isLocal: false,
  });

  socket?.on('created', async (params: scCreatedParams) => {
    await setRoomId(params.roomID);
    await setPlayerID(0);
    callback();
  });
};

function ConfigurationScreen() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [maxPoints, setMaxPoints] = useState(50);
  const [time, setTime] = useState(10);
  const [isMaxPointsChecked, setMaxPointsChecked] = useState(false);
  const context = useContext(MapContext);
  const secondPlayerContext = useContext(SecondPlayerMapContext);
  const navigate = useNavigate();

  const handleOnChange = () => {
    setMaxPointsChecked(!isMaxPointsChecked);
    if (!isMaxPointsChecked) {
      setMaxPoints(width * height);
    }
  };

  const isValid = width && height && maxPoints && time;
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
                <div>
                  <p>Max points</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <input
                    type="text"
                    defaultValue={maxPoints}
                    value={maxPoints}
                    onChange={e => setMaxPoints(Number(e.target.value))}
                    style={{
                      width: '100%',
                    }}></input>
                </div>
                <div>
                  <p>Till end</p>
                  <input
                    type="checkbox"
                    checked={isMaxPointsChecked}
                    onChange={handleOnChange}></input>
                </div>
              </div>
              <div className="inputRow">
                <p>Time for move</p>
                <input
                  defaultValue={time}
                  type="text"
                  onChange={e => setTime(Number(e.target.value))}></input>
              </div>
            </div>
            <div className="inputRow">
              <div className="buttonContainer">
                <button
                  type="button"
                  className="playButton"
                  disabled={!isValid}
                  onClick={() =>
                    createLocal(context, secondPlayerContext, () => navigate('/boardLocal'))
                  }>
                  Ｌｏｃａｌ　ｇａｍｅ
                </button>
              </div>
              <div className="buttonContainer">
                <button
                  type="button"
                  className="playButton"
                  disabled={!isValid}
                  onClick={() => {
                    context.setMapconfig(width, height, maxPoints, time);
                    create(
                      {
                        ...context,
                        gameConfig: { ...context.gameConfig, width, height, maxPoints, time },
                      },
                      () => navigate('/board'),
                    );
                  }}>
                  Ｎｅｔｗｏｒｋ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ConfigurationScreen;
