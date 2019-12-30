import Nav from '../../../components/nav'
import { Card, Row, Col, Jumbotron } from 'react-bootstrap'
import { MOCK_EVENT_DATA } from '../../../src/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import QRCode from 'qrcode.react'

const PresentEvent = ({ eventData }) => {
  const startTime = moment(eventData.beginDateTime).format('h:mm a')
  const endTime = moment(eventData.endDateTime).format('h:mm a')
  const signInURL = `http://localhost:3000/signin/${eventData.signInID}`

  return (
    <Jumbotron className='mx-3'>
      <h1>{eventData.name}</h1>
      <p>Start Time: {startTime}</p>
      <Row>
        <Col sm={12} md={3}>
          <QRCode includeMargin size={256} renderAs='svg' value={signInURL} />
          <p>Scan the QR code or sign in at {signInURL}</p>
        </Col>
        <Col sm={12} md={9}>
          <h4>Current Signed-In Attendants</h4>
          <hr />
        </Col>
      </Row>
    </Jumbotron>
  )
}

PresentEvent.getInitialProps = async ({ query }) => {
  // Would request the website usually, mock for now
  const { eid } = query
  const data = MOCK_EVENT_DATA[eid]
  return { eventData: data }
}

export default PresentEvent