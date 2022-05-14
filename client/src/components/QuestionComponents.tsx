import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './QuestionComponents.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import dolphin from '../assets/images/dolphin.png';

function QuestionComponents() {
  return (
      <Container fluid>
        <div className='questionNavbar'>
          <Row className="justify-content-md-center">
              <Col className='leftCenter'>
              [１]　ｑｕｅｓｔｉｏｎ
              </Col>
              <Col xs="auto" className='rightCenter'>
                <div className='closeQuestion'>
                    X
                  </div>
              </Col>
          </Row>

          <div className='questionPanel'>
            <Row>
              <Col xs={9}>QUESTION
              </Col>
              <Col>
                <div className='dolphinContainer'>
                  <img src={dolphin} className='dolphin'/>
                </div>
                </Col>             
            </Row>
          </div>
        </div>


      </Container>
  )
}

export default QuestionComponents