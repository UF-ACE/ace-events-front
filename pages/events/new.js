import Nav from '../../components/nav'
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
import 'react-quill/dist/quill.snow.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic';
import 'babel-polyfill'
import { RichUtils } from 'draft-js';
const NoSSREditor = dynamic(() => import('../../components/editor'), { ssr: false });

const EventNew = (props) => {
  const [loggedIn, user] = useUser()
  const router = useRouter()

  // Event Placeholders
  const placeholders = eventPlaceHolders()
  const [placeHolderName] = useState(placeholders.name)
  const [placeHolderLocation] = useState(placeholders.location)
  const [formData, setFormData] = useState({ start_time: new Date(), end_time: new Date()})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleOnChange = (field, val) => {
    
    let data = {...formData}
    data[field] = val
    setFormData(data)
  }

  const handleSubmit = () => {
    setLoading(true)
    createEvent(formData).then(({success, location, errors}) => {
      setLoading(false)
      setErrors(errors.error)
      
      if (success) {
        router.push(location)
      }
    })
  }

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Kollektif',
        'sans-serif'
      ].join(','),
    },
  })

  const nameErrors = errors.name ? errors.name.map((error, index) => (
    <Form.Text className="text-error">
      {error}
    </Form.Text>
  )) : null

  const descriptionErrors = errors.description ? errors.description.map((error, index) => (
    <Form.Text className="text-error">
      {error}
    </Form.Text>
  )) : null

  const locationErrors = errors.location ? errors.location.map((error, index) => (
    <Form.Text className="text-error">
      {error}
    </Form.Text>
  )) : null

  const startErrors = errors.start_time ? errors.start_time.map((error, index) => (
    <Form.Text className="text-error">
      {error}
    </Form.Text>
  )) : null

  const endErrors = errors.end_time ? errors.end_time.map((error, index) => (
    <Form.Text className="text-error">
      {error}
    </Form.Text>
  )) : null

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Nav loggedIn={loggedIn} />
        <Container className='mt-4'>
          <h1>Create a New Event</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={placeHolderName} onChange={(val) => handleOnChange('name', val.target.value)} isInvalid={nameErrors} />
              {nameErrors}
            </Form.Group>

            <Form.Group controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <NoSSREditor 
                placeholder="Description"
                onTabEnter={() => { bodyRef.focus(); return true}}
                onNewEditState={(htmlText) => handleOnChange('description', htmlText)}
              />
              {descriptionErrors}
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder={placeHolderLocation} onChange={(val) => handleOnChange('location', val.target.value)} isInvalid={locationErrors}  />
              {locationErrors}
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>Start Date and Time</Form.Label> <br />
              <DateTimePicker minutesStep={10} inputVariant="outlined" value={formData.start_time} onChange={date => handleOnChange('start_time', date.toDate())} isInvalid={startErrors}/>
              {startErrors}
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>End Date and Time</Form.Label> <br />
              <DateTimePicker minutesStep={10} inputVariant="outlined" value={formData.end_time} onChange={date => handleOnChange('end_time', date.toDate())} isInvalid={endErrors} />
              {endErrors}
            </Form.Group>
            
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              Submit
            </Button>
          </Form>
        </Container>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default EventNew