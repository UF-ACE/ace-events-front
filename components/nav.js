import { Nav, Navbar, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { NAV_LOGGED_IN, NAV_LOGGED_OUT } from '../src/data'
import { useCookies } from 'react-cookie'

function Header(props) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  const loggedIn = props.loggedIn

  const navData = loggedIn ? NAV_LOGGED_IN : NAV_LOGGED_OUT

  const onLinkPress = eventKey => {
    const item = navData[eventKey]
    if (item.preHref) {
      item.preHref(removeCookie)
    }
    router.push(item.href)
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
              src={require('../public/logo.png?resize&sizes[]=70&sizes[]=140')}
              height="30"
              alt="Logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav 
              className="ml-auto"
              activeKey={router.pathname}
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