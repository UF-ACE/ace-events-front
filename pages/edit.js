import React, { useState } from 'react'
import momentLocalizer from 'react-widgets-moment';
import {EditorState, ContentState} from 'draft-js';
import Moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { createOrUpdateEvent, getEvent } from '../src/event.js'
import { Container, Form, Button, Spinner } from 'react-bootstrap'
import { eventPlaceHolders } from '../src/data'
import 'react-quill/dist/quill.snow.css'
import 'react-widgets/dist/css/react-widgets.css';

import Editor from '../components/editor'
import { useParams } from 'react-router-dom';


const New = (props) => {
  const { eid } = useParams()
  let isNew = false

  if (eid == 'new') {
    isNew = true
  }

  const [formData, setFormData] = useState({ start_time: new Date(), end_time: new Date()})
  const [loadingEvent, setLoadingEvent] = useState(false)

  if (!isNew && !loadingEvent && !formData.name) {
    getEvent(eid).then((event) => {
      setFormData(event)
      setLoadingEvent(false)
    })
    setLoadingEvent(true)
  }


  // Event Placeholders
  const placeholders = eventPlaceHolders()
  const [placeHolderName] = useState(placeholders.name)
  const [placeHolderLocation] = useState(placeholders.location)

  const createTitle = 'Create a New Event'
  const editTitle = `Edit ${formData.name ? formData.name : 'a Event..'}`

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [descInit, setDescInit] = useState(!isNew)



  Moment.locale('en')
  momentLocalizer()

  const handleOnChange = (field, val) => {
    
    let data = {...formData}
    data[field] = val
    setFormData(data)
  }

  const handleSubmit = () => {
    setLoading(true)
    createOrUpdateEvent(formData, !isNew, eid).then(({success, location, errors}) => {
      setLoading(false)
      setErrors(errors.error)
      
      if (success) {
        if (isNew) {
          window.location.pathname = location
        } else {
          window.location.pathname = `/${eid}`
        }
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

  if (loadingEvent) {
    return (
      <Container className='mt-4'>
        <Spinner animation="border" className="mx-auto d-flex" />
      </Container>
    )
  }

  return (
    <Container className='mt-4'>
      <h1>{isNew ? createTitle : editTitle}</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder={placeHolderName} value={formData.name} onChange={(val) => handleOnChange('name', val.target.value)} isInvalid={nameErrors} />
          {nameErrors}
        </Form.Group>

        <Form.Group controlId="formDesc">
          <Form.Label>Description</Form.Label>
          <Editor 
            placeholder="Description"
            loadDefault={descInit && formData.description}
            initCallback={() => setDescInit(false)}
            initValue={EditorState.createWithContent(ContentState.createFromText(formData.description ? formData.description : ""))}
            onTabEnter={() => { bodyRef.focus(); return true}}
            onNewEditState={(htmlText) => handleOnChange('description', htmlText)}
          />
          {descriptionErrors}
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder={placeHolderLocation} value={formData.location} onChange={(val) => handleOnChange('location', val.target.value)} isInvalid={locationErrors}  />
          {locationErrors}
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>Start Date and Time</Form.Label> <br />
          <DateTimePicker
            defaultValue={Moment(formData.start_time).toDate()}
            onChange={value => handleOnChange('start_time', value)}
          />
          {startErrors}
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>End Date and Time</Form.Label> <br />
          <DateTimePicker
            defaultValue={Moment(formData.end_time).toDate()}
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