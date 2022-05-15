import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function GameOverComponts() {
  return (
    <div className="modalView">
      <div className="settingsWindow">
        <div className="bar">
          <div className="barTitle">
            <div>[１]　Ｇａｍｅ　ｏｖｅｒ</div>
          </div>
          <div className="closeIcon">X</div>
        </div>
        <div className="internalWindow">
          <div className="settingTitle hugeTitle">
            <p>【】</p>
          </div>
          <div className='inputRow'>
            <div className="settingTitle">
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default GameOverComponts;
