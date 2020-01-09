import Nav from '../components/nav'
import { logout, useUser } from '../src/user.js'
import { Container, Row, Col, Jumbotron, Button, Card } from 'react-bootstrap'
import { getAllEvents } from '../src/event'
const HtmlToReactParser = require('html-to-react').Parser
const htmlParser = new HtmlToReactParser()

const Home = (props) => {
  const [loggedIn, user] = useUser()
  
  const eventWidth = user.isChair ? 9 : 12
  const adminPanel = (
    <Col xs={12} sm={12 - eventWidth}>
      <Jumbotron className="my-0 py-4">
        <h4>Admin Panel</h4>
        <hr />
        <Button block href='/events/new'>Create Event</Button>
      </Jumbotron>
    </Col>
  )
  const presentPanel = user.isChair ? adminPanel : null

  const eventCards = props.allEvents.map((event, index) => (
    <Card className='w-100 my-2'>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        {event.description ?
        <Card.Text>
          {`${event.description.replace(/<\/?\w+>/g, "").slice(0, 200)}...`}
        </Card.Text> : null }
        <Card.Link href={`/events/${event.id}`}>View</Card.Link>
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
            {eventCards.length > 0 ? eventCards : "No Events Coming Up"}
          </Col>
        </Row>
      </Container>
    </>
  )
}

Home.getInitialProps = async () => {
  // Would request the website usually, mock for now
  const data = await getAllEvents()
  return { allEvents: data }
}


export default Home