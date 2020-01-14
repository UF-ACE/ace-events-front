import fetch from 'isomorphic-unfetch'

export function createEvent(params) {
  return new Promise((resolve, reject) => {
    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event: params})
    }

    fetch('http://localhost/api/events', request).then(res => {
      const success = res.status == 201
      if (!success) {
        res.json().then(json => resolve({success, location: null, errors: json}))
      } else {
        resolve({success, location: res.headers.get('location').slice(4), errors: {error: {}}})
      }
    })
  })
}

export function getAllEvents() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost/api/events.json').then(res => res.json()).then(json => resolve(json.content))
  })
}

export function getEvent(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost/api/events/${id}.json`).then(res => res.json()).then(json => resolve(json.content))
  })
}

export function getEventAttendees(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost/api/events/${id}/attendees.json`).then(res => res.json()).then(json => resolve(json))
  })
}

export function signInToEvent(signInId) {
  return new Promise((resolve, reject) => {
    let request = {
      method: 'POST'
    }

    fetch(`http://localhost/api/sign_in/${signInId}`, request).then(res => {
      const success = res.status == 201
      if (!success) {
        res.json().then(json => resolve({success, status: res.status, errors: json}))
          .catch(() => resolve({success, status: res.status, errors: {error: {}}}))
      } else {
        resolve({success, status: res.status, errors: {error: {}}})
      }
    })
  })
}