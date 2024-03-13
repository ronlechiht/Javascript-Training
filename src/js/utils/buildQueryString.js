export const buildQueryString = (params) => {
  let queryString = '?'
  Object.keys(params).map((key) => {
    queryString = queryString + key + '=' + params[key] + '&'
  })
  return queryString
}
