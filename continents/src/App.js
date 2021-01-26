import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Footer from './components/Footer'
import Filter from './components/Filter';
import Countries from './components/Countries';


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      axios.get(url).then(response => {
        console.log("fetched countries: ", response.data)
        if (response.data.length > 0) {
          setCountry({
            found: true,
            data: response.data[0]
          })
        }

      }).catch(error => {
        setCountry({ found: false })
      })
    }

  }, [name])

  return country
}
const p = {
  "border": "2px solid cyan",
  "border-radius": "5px"
  
}

const App = () => {
  
  
  
  const [searched, setNewSearched] = useState('')
  const [countries, setCountries] = useState([])

  const [filteredCountries, setFilteredCountries] = useState(countries)
  
  const [showTen, setShowTen] = useState(true)
  const [showOne, setShowOne] = useState(false)
  

  const hook = () => {
    console.log('effect countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log('got countries (size; ', countries.length, ")")
      })
  }

  useEffect(hook, [])


  

  const handleNewSearched = (event) => {
    console.log("event ", event)

    let filtered = countries.filter(
      x =>
        x.name.toUpperCase().includes(
          event.target.value.toUpperCase()))
    event.preventDefault()
    setNewSearched(event.target.value)
    setFilteredCountries(filtered)
    setShowTen(filtered.length < 1000)
    setShowOne(filtered.length === 1 && filtered !== [])

  }


  return (
    <>
      <div class="container" style={p}>

        <Filter value={searched} change={handleNewSearched} />
      
        <Countries countries={filteredCountries}
          one={showOne}
          ten={showTen} />

      </div><div class="container" style={p}><Footer /></div>
    </>)
}

export default App