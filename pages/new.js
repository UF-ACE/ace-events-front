import React, { useState } from 'react'
import momentLocalizer from 'react-widgets-moment';
import Moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { createEvent } from '../src/event.js'
import { Container, Form, Button } from 'react-bootstrap'
import { eventPlaceHolders } from '../src/data'
import 'react-quill/dist/quill.snow.css'
import 'react-widgets/dist/css/react-widgets.css';

import Editor from '../components/editor'

const New = (props) => {
  // Event Placeholders
  const placeholders = eventPlaceHolders()
  const [placeHolderName] = useState(placeholders.name)
  const [placeHolderLocation] = useState(placeholders.location)
  const [formData, setFormData] = useState({ start_time: new Date(), end_time: new Date()})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})



  Moment.locale('en')
  momentLocalizer()

  console.log(formData)

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
        window.location.pathname = location
      }
    })
  }

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
          <Editor 
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
          <DateTimePicker
            defaultValue={new Date()}
            onChange={value => handleOnChange('start_time', value)}
          />
          {startErrors}
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>End Date and Time</Form.Label> <br />
          <DateTimePicker
            defaultValue={new Date()}
            onChange={value => handleOnChange('end_time', value)}
          />
          {endErrors}
        </Form.Group>
        
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default New