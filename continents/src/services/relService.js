import axios from 'axios'

const religionsUrl = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-religion.json' 

export const relService = async () => {
  try {
    const response = await axios.get(religionsUrl)
    //console.log("RELIGIONS response data= ",response.data)
    return response.data
  } catch (error) {
    console.log(`error fetching rels from ${religionsUrl} ; ${error} ${error.response && error.response.data}`)
  }
}
