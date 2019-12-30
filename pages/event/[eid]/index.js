import Nav from '../../../components/nav'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { MOCK_EVENT_DATA } from '../../../src/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const EventPage = ({ eventData }) => {
  const startTime = moment(eventData.beginDateTime).format('ddd. MMMM Do h:mm a')
  const endTime = moment(eventData.endDateTime).format('h:mm a')
  return (
    <>
      <Nav />
      <Container>
        <Jumbotron className='mt-4'>
          <h1>{eventData.name}</h1>
        </Jumbotron>
        <Row>
          <Col md={8} sm={12}>
            {eventData.description}
          </Col>
          <Col md={4} sm={12}>
            <Jumbotron className='mt-0'>
              <div><FontAwesomeIcon icon={faClock} /> {startTime} - {endTime}</div>
              <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {eventData.location}</div>
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
  const data = MOCK_EVENT_DATA[eid]
  return { eventData: data }
}

export default EventPage