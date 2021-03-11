import axios from 'axios'

const loginUrl = `api/login`
const registerUrl = `api/register`
const port = `3003`

export const loginService = async loginObject => {
  try {
    const response = await axios.post(loginUrl,loginObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`})
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const registerService = async registerObject => {
  try {
    const response = await axios.post(registerUrl,registerObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`})
    return response.data
  } catch (error) {
    let changeMe = Array.isArray(error.response.data)?error.response.data[0]:error.response.data
    console.log(`register error: ${error}, response: ${changeMe.error}`)
    return changeMe
  }
}
