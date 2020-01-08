import Nav from '../../components/nav'
import dynamic from 'next/dynamic'
import { useUser } from '../../src/user.js'
import { createEvent } from '../../src/event.js'

import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { eventPlaceHolders } from '../../src/data'
import { useState } from 'react'
import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const EventNew = (props) => {
  const [loggedIn, user] = useUser()

  // Event Placeholders
  const placeholders = eventPlaceHolders()
  const [placeHolderName] = useState(placeholders.name)
  const [placeHolderLocation] = useState(placeholders.location)
  const [formData, setFormData] = useState({ start_time: new Date(), end_time: new Date()})

  const handleOnChange = (field, val) => {
    let data = {...formData}
    data[field] = val
    setFormData(data)
  }

  const handleSubmit = () => {
    createEvent(formData).then(res => console.log(res))
  }

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Kollektif',
        'sans-serif'
      ].join(','),
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Nav loggedIn={loggedIn} />
        <Container className='mt-4'>
          <h1>Create a New Event</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={placeHolderName} onChange={(val) => handleOnChange('name', val.target.value)}  />
            </Form.Group>

            <Form.Group controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Event Description" onChange={(val) => handleOnChange('description', val.target.value)}  />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder={placeHolderLocation} onChange={(val) => handleOnChange('location', val.target.value)}  />
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>Start Date and Time</Form.Label> <br />
              <DateTimePicker minutesStep={10} inputVariant="outlined" value={formData.start_time} onChange={date => handleOnChange('start_time', date.toDate())}/>
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>End Date and Time</Form.Label> <br />
              <DateTimePicker minutesStep={10} inputVariant="outlined" value={formData.end_time} onChange={date => handleOnChange('end_time', date.toDate())}/>
            </Form.Group>
            
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default EventNew