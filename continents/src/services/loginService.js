import axios from 'axios'

const loginUrl = `api/login`
const registerUrl = `api/register`
const port = `3003`


const debugObjsToStr = (objArray) => {
  return objArray.map(a => `(${ Object.values(a).join(", ") })`).join(", ")
}


export const loginService = async loginObject => {
  try {
    const response = await axios.post(loginUrl,loginObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`})
    return response.data
  } catch (error) {
    console.log(`login error: ${error}, response: ${debugObjsToStr(error.response.data)} `)
    return error.response.data
  }
}

export const registerService = async registerObject => {
  try {
    const response = await axios.post(registerUrl,registerObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`})
    return response.data
  } catch (error) {
    console.log(`register error: ${error}, response: ${debugObjsToStr(error.response.data)}`)
    return error.response.data
  }
}
