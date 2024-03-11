
const BASE_URL = '//localhost:8000/api'

const getUrl = (...path: string[]) =>
  [ BASE_URL, ...path ]
    .map(item => item.trim())
    .map(item => item)
    .join('/')

const makeRequest = async (endpoint: string, options = {}) => {
  const url       = getUrl(endpoint)
  const response  = await fetch(url, options)

  return await response.json()
}

const getMap      = () => makeRequest('map', { method: 'get' })
const getDrones   = () => makeRequest('drones', { method: 'get' })

const api = {
  getMap,
  getDrones,
}

export default api
