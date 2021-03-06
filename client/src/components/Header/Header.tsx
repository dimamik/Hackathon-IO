import navbarIcon from '../../assets/images/navbarIcon.png';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="header">
        <div className="container">
          <img src={navbarIcon} className="navbarIcon"></img>
          <LinkContainer to="/">
            <Navbar.Brand>
              <div className="container appTitle">【~~ＶａｐｏｒＷＩＥＴ~~】</div>
            </Navbar.Brand>
          </LinkContainer>
        </div>
        <Nav className="me-auto">
          <div className="container">
            <LinkContainer to="/home">
              <Nav.Link>
                <div className="container">
                  <div>【&nbsp;H&nbsp;o&nbsp;m&nbsp;e&nbsp;】</div>
                </div>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add_question">
              <Nav.Link>
                <div className="container">
                  <div>【&nbsp;A&nbsp;d&nbsp;d&nbsp;】</div>
                </div>
              </Nav.Link>
            </LinkContainer>
          </div>
        </Nav>
      </div>
    </header>
  );
}

export default Header;
