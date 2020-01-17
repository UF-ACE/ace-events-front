import React from 'react';

import { Nav, Navbar, Container } from 'react-bootstrap'
import { NAV_LOGGED_IN, NAV_LOGGED_OUT } from '../src/data'
import { useCookies } from 'react-cookie'
import Logo from '../public/logo.png'

function Header(props) {
  const [cookies, setCookie, removeCookie] = useCookies()
  const loggedIn = props.loggedIn

  const navData = loggedIn ? NAV_LOGGED_IN : NAV_LOGGED_OUT(window.location.href)

  const onLinkPress = eventKey => {
    const item = navData[eventKey]
    if (item.preHref) {
      item.preHref(removeCookie)
    }
    window.location.href = item.href
  }

  const navLinks = navData.map((item, key) => (
    <Nav.Link eventKey={key} key={key}>{item.name}</Nav.Link>
  ))

  return (
    <>
      <Navbar variant="dark" bg="blue" expand="md" onSelect={onLinkPress}>
        <Container>
          <Navbar.Brand>
            <img
              src={Logo}
              height="30"
              alt="Logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav 
              className="ml-auto"
              activeKey={window.location.pathname}
            >
              {navLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header