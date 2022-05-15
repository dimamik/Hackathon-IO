import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';

function AdditionalQuestionScreen() {
  const [question, setQuestion] = useState('');
  const [point, setPoint] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [firstAnswer, setFirstAnswer] = useState('');
  const [secondAnswer, setSecondAnswer] = useState('');
  const [thirdAnswer, setThirdAnswer] = useState('');

  const onClick = () => {};
  const isValid = question && correctAnswer && firstAnswer && secondAnswer && thirdAnswer;
  return (
    <form>
      <div className="background">
        <div className="settingsWindow">
          <div className="bar">
            <div className="barTitle">
              <div>[１]　Ａｄｄｉｔｉｏｎａｌ　Ｑｕｅｓｔｉｏｎ</div>
            </div>
            <div className="closeIcon">X</div>
          </div>
          <div className="internalWindow">
            <div className="settingTitle">
              <p>【Ｑｕｅｓｔｉｏｎ】</p>
            </div>
            <div className="verticalSettingOptions">
              <div className="inputRow">
                <p>Type Qustion</p>
                <input
                  type="text"
                  defaultValue={question}
                  onChange={e => setQuestion(e.target.value)}></input>
              </div>
              <div className="settingTitle">
                <p>【Ｐｏｉｎｔ】</p>
              </div>
              <div className="verticalSettingOptions">
                <div className="inputRow">
                  <p>Difficulty</p>
                  <input
                    min="1"
                    max="5"
                    step="2"
                    type="number"
                    defaultValue={point}
                    onChange={e => setPoint(Number(e.target.value))}></input>
                </div>
              </div>
              <div className="settingTitle">
                <p>【Ｃｏｒｒｅｃｔ　Ａｎｓｗｅｒ】</p>
              </div>
              <div className="verticalSettingOptions">
                <div className="inputRow">
                  <p>Type Answer</p>
                  <input
                    type="text"
                    defaultValue={correctAnswer}
                    onChange={e => setCorrectAnswer(e.target.value)}></input>
                </div>
              </div>
              <div className="settingTitle">
                <p>【Ｏｔｈｅｒ　Ａｎｓｗｅｒ】</p>
              </div>
              <div className="verticalSettingOptions">
                <div className="inputRow">
                  <p>Type Answer</p>
                  <input
                    type="text"
                    defaultValue={firstAnswer}
                    onChange={e => setFirstAnswer(e.target.value)}></input>
                </div>
              </div>
              <div className="verticalSettingOptions">
                <div className="inputRow">
                  <p>Type Answer</p>
                  <input
                    type="text"
                    defaultValue={secondAnswer}
                    onChange={e => setSecondAnswer(e.target.value)}></input>
                </div>
              </div>
              <div className="verticalSettingOptions">
                <div className="inputRow">
                  <p>Type Answer</p>
                  <input
                    type="text"
                    defaultValue={thirdAnswer}
                    onChange={e => setThirdAnswer(e.target.value)}></input>
                </div>
              </div>
              <div className="buttonContainer">
                <button
                  type="button"
                  className="creatQuestion"
                  onClick={onClick}
                  disabled={!isValid}>
                  Ｃｒｅａｔｅ Ｑｕｅｓｔｉｏｎ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdditionalQuestionScreen;
