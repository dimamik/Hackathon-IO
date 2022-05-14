import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col>
              <div className="footer">Copyright &copy; ~~VaporWIET~~</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
