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
                <div className='container'>
                    <Nav className="me-auto">
                        <div className='container'>
                            <LinkContainer to="/home">
                                <Nav.Link>
                                    <div className="container">【Ｈｏｍｅ】</div>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/board">
                                <Nav.Link>
                                    <div className="container">【Board】</div>
                                </Nav.Link>
                            </LinkContainer>
                        </div>
                    </Nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
