export const HttpService = {
  get: async (path) => {
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then((value) => value.json())
  },

  post: async (path, data) => {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },

  put: async (path, data) => {
    await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },

  delete: async (path) => {
    await fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
