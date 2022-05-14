import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function QuestionComponents() {
  return (
    <div className='questionPanel'>
      <Container>
        <Row>
          <div className='questionNavbar'>
          <Col>
            [１]　ｑｕｅｓｔｉｏｎ
          </Col>
          <Col className='rightCenter'>
            <div className='closeQuestion'>
              X
            </div>
          </Col>
          </div>

        </Row>
      </Container>
    </div>
  )
}

export default QuestionComponents