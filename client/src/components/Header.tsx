import React from 'react';
import './Header.css';
import navbarIcon from '../assets/images/navbarIcon.png';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

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
                  <p>【Home】</p>
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
