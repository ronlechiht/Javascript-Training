export const createPath = (url, params) => {
  let query = '?'
  for (let key in params) {
    query = query + key + '=' + params[key] + '&'
  }
  const path = url + query
  return path
}
