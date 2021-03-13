import axios from 'axios'

const currencyUrl = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-currency-code.json' 

export const currencyService = async () => {
  try {
    const response = await axios.get(currencyUrl)
    console.log("currency response data= ",response.data)
    return response.data
  } catch (error) {
    console.log(`error fetching currency from ${currencyUrl} ; ${error} ${error.response && error.response.data}`)
  }
}
