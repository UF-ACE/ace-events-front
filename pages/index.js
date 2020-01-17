import React from 'react';

import { Container, Row, Col, Jumbotron, Button, Card } from 'react-bootstrap'
import { getAllEvents } from '../src/event'
import { useState } from 'react'
import { useUser } from '../src/user';

const Home = (props) => {
  const [loggedIn, user] = useUser()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  if (loading) {
    getAllEvents().then(data => setEvents(data))
    setLoading(false)
  }
  
  const eventWidth = user.isChair ? 9 : 12
  const adminPanel = (
    <Col xs={12} sm={12 - eventWidth}>
      <Jumbotron className="my-0 py-4">
        <h4>Admin Panel</h4>
        <hr />
        <Button block href='/new'>Create Event</Button>
      </Jumbotron>
    </Col>
  )
  const presentPanel = user.isChair ? adminPanel : null

  const eventCards = events.map((event, index) => (
    <Card key={index} className='w-100 my-2'>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        {event.description ?
        <Card.Text>
          {`${event.description.replace(/<\/?\w+>/g, "").replace('&nbsp;', '').slice(0, 200)}...`}
        </Card.Text> : null }
        <Card.Link href={`/${event.id}`}>View</Card.Link>
      </Card.Body>
    </Card>
  ))

  return (
    <>
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


export default Home