

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
        res.json().then(json => resolve({success, errors: json}))
      } else {
        resolve({success, errors: {error: {}}})
      }
    })
  })
}

export function getAllEvents() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost/api/events.json').then(res => res.json()).then(json => resolve(json.content))
  })
}