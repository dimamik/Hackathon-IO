import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dolphin from '../../assets/images/dolphin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuestionComponents.css';

function QuestionComponents() {

  const [questionValue, setQuestionValue] = useState('Kocham piwo?'); 
  const [answer1Value, setAnswer1Value] = useState('tak'); 
  const [answer2Value, setAnswer2Value] = useState(''); 
  const [answer3Value, setAnswer3Value] = useState(''); 
  const [answer4Value, setAnswer4Value] = useState(''); 


  return (
    <Container fluid>
      <div className="questionNavbar">
        <div className="bar">
          <div className="barTitle">
            <div>[１]　Q u e s t i o n</div>
          </div>
          <div className="closeIcon">X</div>
        </div>

        <div className="questionPanel">
          <div className="title">
            <p>Question</p>
          </div>
          <div className="question">
            <p>{questionValue}</p>
          </div>
          <div className="dolphinContainer">
            <img src={dolphin} className="dolphin" />
          </div>
          <div className="answers">
            <button type="button" className="button">
              {answer1Value}
            </button>

            <button type="button" className="button">
              {answer2Value}
            </button>

            <button type="button" className="button">
              {answer3Value}
            </button>

            <button type="button" className="button">
              {answer4Value}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default QuestionComponents;
