

export function createEvent(params) {
  return new Promise((resolve, reject) => {
    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event: params})
    }

    fetch('http://localhost/api/events', request).then(res => resolve(res))
  })
}