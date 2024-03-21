import { buildQueryString } from '../utils/buildQueryString'

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

  static get = async (path, params) => {
    if (params) {
      const queryString = buildQueryString(params)
      path = path + queryString
    }
    return this.request(path, 'GET')
  }

  static post = async (path, data) => {
    await this.request(path, 'POST', data)
  }

  static put = async (id, path, data) => {
    path = path + '/' + id
    await this.request(path, 'PUT', data)
  }

  static delete = async (id, path) => {
    path = path + '/' + id
    await this.request(path, 'DELETE')
  }
}
