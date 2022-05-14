import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
        <footer>
            <Container>
                <Row>
                    <Col className='footer'>
                        Copyright &copy; ~~VaporWIET~~
                    </Col>
                </Row>
            </Container>
        </footer>
    </div>
  )
}

export default Footer