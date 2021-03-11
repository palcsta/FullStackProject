import axios from 'axios'

const apiPort = `3003`

const blocsUrl = `api/blocs`

export const saveBlocService = async (blocObject,token) => {
  try {
    const response = await axios.post(blocsUrl,blocObject,{ headers: { Authorization: token }, baseURL: `${window.location.protocol}//${window.location.hostname}:${apiPort}`})
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getBlocsService = async token => {
  try {
    const response = await axios.get(blocsUrl,{ headers: { Authorization: token }, baseURL: `${window.location.protocol}//${window.location.hostname}:${apiPort}`})
    return response.data
  } catch (error) {
    return error.response.data
  }
}
