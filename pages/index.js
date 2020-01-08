import Nav from '../components/nav'
import { logout, useUser } from '../src/user.js'
import { Container, Row, Col, Jumbotron, Button, Card } from 'react-bootstrap'
import { getAllEvents } from '../src/event'
import { useState, useEffect } from 'react'

const Home = (props) => {
  const [loggedIn, user] = useUser()
  const [loading, setLoading] = useState(true)
  const [allEvents, setEvents] = useState([])
  
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

  useEffect(() => {
    if (loading) {
      getAllEvents().then(events => {
        console.log(events)
        setLoading(false)
        setEvents(events)
      })
    }
  })

  const eventCards = allEvents.map((event, index) => (
    <Card className='w-100 my-2'>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          {event.description}
        </Card.Text>
        <Card.Link href={`/event/${event.id}`}>View</Card.Link>
      </Card.Body>
    </Card>
  ))

  return (
    <>
      <Nav loggedIn={loggedIn} />
      <Container className='mt-4'>
        <Row>
          {presentPanel}
          <Col sm={eventWidth} xs={12}>
            <h1 className='mb-2'>Upcoming Events</h1>
            {eventCards}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home