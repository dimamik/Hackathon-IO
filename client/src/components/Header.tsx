import React from 'react'
import './Header.css'
import navbarIcon from '../assets/images/navbarIcon.png'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <header>
        <div className='header'>
            <div className='container'>
                <img src={navbarIcon} className='navbarIcon'></img>
                <LinkContainer to="/">
                    <Navbar.Brand><div className='container appTitle'>【~~ＶａｐｏｒＷＩＥＴ~~】</div></Navbar.Brand>
                </LinkContainer>
            </div>
            <div>
            <Nav className="me-auto">
                <LinkContainer to="/home">
                    <Nav.Link><div className='container'>【Ｈｏｍｅ】</div></Nav.Link>
                </LinkContainer>
            </Nav>
            </div>
        </div>
    </header>
  )
}

export default Header