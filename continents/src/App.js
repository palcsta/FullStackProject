import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Footer from './components/Footer'
import Filter from './components/Filter';

const p = {
  "border": "2px solid cyan",
  "border-radius": "5px"
}
const App = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState([])
  const [countries, setCountries] = useState([])


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

    event.preventDefault()
    setName(event.target.value)

    let country = countries.filter(
      x =>
        x.name.toUpperCase().includes(
          event.target.value.toUpperCase()))

    setCountry(country)
    

  }

  return (
    <>
      <div class="container" style={p}>
        <Filter value={name} change={handleNewSearched} />
        <Country country={country} />
      </div><div class="container" style={p}><Footer /></div>
    </>)
}

export default App