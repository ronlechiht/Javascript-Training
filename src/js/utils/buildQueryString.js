export const buildQueryString = (params) => {
  let queryString = '?'
  const urlParams = new URLSearchParams(params)
  queryString = queryString + urlParams
  return queryString
}
