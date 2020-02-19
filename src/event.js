import fetch from 'isomorphic-unfetch'

export function createOrUpdateEvent(params, isUpdate = false, id = undefined) {
  return new Promise((resolve, reject) => {
    let request = {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event: params})
    }

    const url = isUpdate ? `/api/events/${id}` : '/api/events'

    fetch(url, request).then(res => {
      const success = res.status == (isUpdate ? 200 : 201)
      if (!success) {
        res.json().then(json => resolve({success, location: null, errors: json}))
      } else {
        resolve({success, location: isUpdate ? '' : res.headers.get('location').slice(11), errors: {error: {}}})
      }
    })
  })
}

export function getAllEvents() {
  return new Promise((resolve, reject) => {
    fetch('/api/upcoming.json').then(res => res.json()).then(json => resolve(json.content))
  })
}

export function getEvent(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/events/${id}.json`).then(res => res.json()).then(json => resolve(json.content))
  })
}

export function getEventAttendees(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/events/${id}/attendees.json`).then(res => res.json()).then(json => resolve(json))
  })
}

export function signInToEvent(signInId) {
  return new Promise((resolve, reject) => {
    let request = {
      method: 'POST'
    }

    fetch(`/api/sign_in/${signInId}`, request).then(res => {
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