
import React, { useState, useEffect } from 'react';
import Country from './Country'



const Filter = ({ countries }) => {

  const [searched, setNewSearched] = useState('')

  const [found, setFound] = useState([])



  const handleNewSearched = (event) => {
    console.log("event ", event)

    let filtered = countries.filter(
      x =>
        x.name.toUpperCase().includes(
          event.target.value.toUpperCase()))
    event.preventDefault()
    setNewSearched(event.target.value)
    console.log(filtered[0])
    filtered.length == 1 ? setFound(filtered[0]) : setFound([])


  }




  const center = {
    "text-align": "center"
  }

  return (
    <>

      <div style={center}>
        <input placeholder="Search for the country" value={searched}

          onChange={handleNewSearched} />
      </div>

      {found !== [] ? <Country countries={found} /> : ""}
    </>)
}
export default Filter
