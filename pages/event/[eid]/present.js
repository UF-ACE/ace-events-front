import Nav from '../../../components/nav'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { MOCK_EVENT_DATA } from '../../../src/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const PresentEvent = ({ eventData }) => {
  const startTime = moment(eventData.beginDateTime).format('ddd. MMMM Do h:mm a')
  const endTime = moment(eventData.endDateTime).format('h:mm a')

  return (

  )
}

PresentEvent.getInitialProps = async ({ query }) => {
  // Would request the website usually, mock for now
  const { eid } = query
  const data = MOCK_EVENT_DATA[eid]
  return { eventData: data }
}

export default PresentEvent