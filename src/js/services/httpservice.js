export default class HttpService {
  static request = (path, method, data) => {
    return fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(data && {
        body: JSON.stringify(data),
      }),
    })
  }

  static get = async (path) => {
    return this.request(path, 'GET')
  }

  static post = async (path, data) => {
    await this.request(path, 'POST', data)
  }

  static put = async (path, data) => {
    await this.request(path, 'PUT', data)
  }

  static delete = async (path) => {
    await this.request(path, 'DELETE')
  }
}
