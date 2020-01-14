import Nav from '../../../components/nav'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { getEvent, getEventAttendees } from '../../../src/event'
import { useUser } from '../../../src/user'
import { useState, useEffect } from 'react'

const HtmlToReactParser = require('html-to-react').Parser
const htmlParser = new HtmlToReactParser()

const EventPage = ({ eventData, eid }) => {
  const [loggedIn, user] = useUser()
  const [adminEventData, setAdminEventData] = useState({})
  const [eventAttendees, setAttendees] = useState([])
  const [checkingAdmin, setCheck] = useState(true)

  if (checkingAdmin && loggedIn && user.isChair) {
    getEvent(eid).then((event) => setAdminEventData(event))
    getEventAttendees(eid).then((a) => setAttendees(a))
    setCheck(false)
  }

  

  const adminInfo = adminEventData.sign_in_id ? (
    <>
      <hr />
      <div>
        Sign In Link: 
        <a href={`/sign_in/${adminEventData.sign_in_id}`}>https://uf-ace.com/sign_in/{adminEventData.sign_in_id}</a>
      </div>
      <div>
        Number of Attendees: {eventAttendees ? eventAttendees.length : null}
      </div>
    </>
  ) : null

  const startTime = moment(eventData.beginDateTime).format('ddd. MMMM Do h:mm a')
  const endTime = moment(eventData.endDateTime).format('h:mm a')
  return (
    <>
      <Nav loggedIn={loggedIn} />
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

// GetInitProps to take advantage of server side rendering
EventPage.getInitialProps = async ({ query }) => {
  // Would request the website usually, mock for now
  const { eid } = query
  const data = await getEvent(eid)
  return { eventData: data, eid }
}

export default EventPage