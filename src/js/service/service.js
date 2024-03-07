export const HttpService = {
  async get(path) {
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then((value) => value.json())
  },

  async post(path, data) {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },

  async put(path, data) {
    await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },

  async delete(path) {
    await fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
