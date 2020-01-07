import Nav from '../components/nav'
import { logout, useUser } from '../src/user.js'
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap'
const Home = (props) => {
  const [loggedIn, user] = useUser()
  
  const eventWidth = user.isChair ? 9 : 12
  const adminPanel = (
    <Col xs={12} sm={12 - eventWidth}>
      <Jumbotron className="my-0 py-4">
        <h4>Admin Panel</h4>
        <hr />
        <Button block href='/event/new'>Create Event</Button>
      </Jumbotron>
    </Col>
  )
  const presentPanel = user.isChair ? adminPanel : null

  return (
    <>
      <Nav loggedIn={loggedIn} />
      <Container className='mt-4'>
        <Row>
          {presentPanel}
          <Col sm={eventWidth} xs={12}>
            <h1 className='mb-2'>Upcoming Events</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home