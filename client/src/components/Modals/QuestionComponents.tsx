import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dolphin from '../../assets/images/dolphin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuestionComponents.css';

function QuestionComponents() {
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
            <p>Dokąd nocą tupta jez?</p>
          </div>
          <div className="dolphinContainer">
            <img src={dolphin} className="dolphin" />
          </div>
          <div className="answers">
            
              <button type="button" className="button">
                Click Me!
              </button>
            
            
              <button type="button" className="button">
                Click Me!
              </button>
            
            
              <button type="button" className="button">
                Click Me!
              </button>
            
          </div>
        </div>
      </div>
    </Container>
  );
}

export default QuestionComponents;
