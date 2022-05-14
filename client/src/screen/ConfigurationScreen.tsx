import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Configuration.css';

function ConfigurationScreen() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [time, setTime] = useState(0);

  const isValid = width & height & maxPoints & time;
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
              <div className="row">
                <p>Width</p>
                <input type="text" onChange={e => setWidth(Number(e.target.value))} className='confInput' ></input>
              </div>
              <div className="row">
                <p>Height</p>
                <input type="text" onChange={e => setHeight(Number(e.target.value))}></input>
              </div>
            </div>
            <div className="settingTitle">
              <p>【Parameters】</p>
            </div>
            <div className="verticalSettingOptions">
              <div className="row">
                <p>Max points</p>
                <input
                  type="text"
                  onChange={e => setMaxPoints(Number(e.target.value))}></input>
              </div>
              <div className="row">
                <p>Time for move</p>
                <input type="text" onChange={e => setTime(Number(e.target.value))}></input>
              </div>
            </div>
            <div className="buttonContainer">
              <Link
                to="/board"
                state={{ width: width, height: height, maxPoints: maxPoints, time: time }}>
                <button type="button" className="button" disabled={!isValid}>
                  Click Me!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ConfigurationScreen;
