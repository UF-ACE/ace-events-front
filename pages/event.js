import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { getEvent, getEventAttendees } from '../src/event'
import { useUser } from '../src/user'
import { useParams } from 'react-router-dom'

const HtmlToReactParser = require('html-to-react').Parser
const htmlParser = new HtmlToReactParser()

const EventPage = (props) => {
  const [eventData, setEventData] = useState({})
  const [eventAttendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(true)
  const { eid } = useParams()

  if (loading && eid) {
    getEvent(eid).then((event) => setEventData(event))
    getEventAttendees(eid).then((a) => setAttendees(a))
    setLoading(false)
  }


  const adminInfo = eventData.sign_in_id ? (
    <>
      <hr />
      <div>
        Sign In Link: 
        <a href={`/sign_in/${eventData.sign_in_id}`}>https://uf-ace.com/sign_in/{eventData.sign_in_id}</a>
      </div>
      <div>
        Number of Attendees: {eventAttendees ? eventAttendees.length : null}
      </div>
    </>
  ) : null

  const startTime = moment(eventData.start_time).format('ddd. MMMM Do h:mm a')
  const endTime = moment(eventData.end_time).format('h:mm a')
  return (
    <>
      <Container>
        <Jumbotron className='mt-4'>
          <h1>{eventData.name}</h1>
        </Jumbotron>
        <Row>
          <Col md={8} sm={12}>
            {htmlParser.parse(eventData.description)}
          </Col>
          <Col md={4} sm={12}>
            <Jumbotron className='mt-0'>
              <div><FontAwesomeIcon icon={faClock} /> {startTime} - {endTime}</div>
              <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {eventData.location}</div>
              {adminInfo}
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EventPage