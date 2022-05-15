import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function GameOverComponts() {
  const btn = { backgroundColor: '#FCCCFC' };
  const textColor = { color: '#000000' };
  return (
    <Container>
      <div className="questionNavbar" style={textColor}>
        <Row className="justify-content-md-center">
          <Col className="leftCenter">【ＧＡＭＥ　ＯＶＥＲ】</Col>
          <Col xs="auto" className="rightCenter">
            <div className="closeQuestion">X</div>
          </Col>
        </Row>

        <div style={btn}>
          <Row className="pt-2">
            <Col>【Ｗｉｎ】:</Col>
          </Row>
          <Row>
            <Col>【Ｓｃｏｒｅ　Ｆｉｒｓｔ　Ｐｌａｙｅｒ】:</Col>
          </Row>
          <Row>
            <Col>【Ｓｃｏｒｅ　Ｓｅｃｏｎｄ　Ｐｌａｙｅｒ】:</Col>
          </Row>
          <Row className="pb-2">
            <Col>【Ｎｕｍｂｅｒ　ｏｆ　ｒｏｕｎｄ】:</Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default GameOverComponts;
