import axios from 'axios'

const countriesUrl = 'https://restcountries.eu/rest/v2/all' 

export const countriesService = async () => {
  try {
    const response = await axios.get(countriesUrl)
    console.log("countries response data= ",response.data)
    return response.data
  } catch (error) {
    console.log(`error fetching countries from ${countriesUrl} ; ${error} ${error.response && error.response.data}`)
  }
}
