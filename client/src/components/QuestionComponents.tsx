import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dolphin from '../assets/images/dolphin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuestionComponents.css';

function QuestionComponents() {
  return (
    <Container fluid>
      <div className="questionNavbar">
        <Row className="justify-content-md-center">
          <Col className="leftCenter">[１]　ｑｕｅｓｔｉｏｎ</Col>
          <Col xs="auto" className="rightCenter">
            <div className="closeQuestion">X</div>
          </Col>
        </Row>

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
            <div>
              <button type="button" className="button">
                Click Me!
              </button>
            </div>
            <div>
              <button type="button" className="button">
                Click Me!
              </button>
            </div>
            <div>
              <button type="button" className="button">
                Click Me!
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default QuestionComponents;
