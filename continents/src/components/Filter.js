
import React, { useState,useEffect } from 'react';
import Countries from './Countries'



const Filter = ({ countries }) => {

  const [searched, setNewSearched] = useState('')
    

  const [filteredCountries, setFilteredCountries] = useState(countries)



  const handleNewSearched = (event) => {
      console.log("event ", event)

      let filtered = countries.filter(
          x =>
              x.name.toUpperCase().includes(
                  event.target.value.toUpperCase()))
      event.preventDefault()
      setNewSearched(event.target.value)
      console.log(filtered.length)
      filtered.length<20 ? setFilteredCountries(filtered) :  setFilteredCountries([])
      
    
  }




  const center = {
    "text-align": "center"
  }

    return(
      <>

      <div style={center}>
        <input placeholder="Search for the country" value={searched}

          onChange={handleNewSearched} />
      </div>
    
      <Countries countries={filteredCountries}/>
    </>)
}
export default Filter
