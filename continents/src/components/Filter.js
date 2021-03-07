
import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Country from './Country'
import Countries from './Countries'
function getColor() {
  const R = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  const G = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  const B = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  return `#${R}${G}${B}`
}





const Filter = ({ countries, country, paint }) => {

  const [searched, setSearched] = useState("")
  console.log("processing filter!!!!!")
  console.log("countries in filter ", countries, " country in filter ", country, " paint in filter, ", paint,
    "searched in filter ", searched)
  const [color, setColor] = useState("")
  const [selected, setSelected] = useState(country !== undefined ?
    <Country country={countries.filter(x => x.alpha2Code == country)[0]} paint={paint} /> : "")
  const [many, setMany] = useState([])

  //searched!==filter ? ()=>setSearched(filter) : ""
  //console.log("found == undefined", selected == undefined, "country == undefined ", country == undefined)
  //searched=="" ? setSelected(<Country country={country[0]} paint={paint} />) : setSelected("")



  const handleNewSearched = (event) => {
    // console.log("event ", event)

    let filtered = countries.filter(
      x =>
        x.name.toUpperCase().includes(
          event.target.value.toUpperCase()))
    event.preventDefault()
    setSearched(event.target.value)
    console.log("FILTERED, ", filtered)
    if (filtered !== undefined) {
      //console.log("filtered", filtered.length)
      if (filtered.length == 1) {
        if (document.querySelector('g') !== null) {
          if (document.getElementById(filtered[0].alpha2Code.toLowerCase()) !== null) {
            let col = getColor()
            document.getElementById(filtered[0].alpha2Code.toLowerCase()).style.fill = col
            setColor(col)
            setSelected(<Country country={filtered[0]} paint={col} />)
            //setSearched("")
          }
        }

        setMany("")

        console.log("searched is now, ", searched)
      }
      if (filtered.length < 21 && filtered.length !== 1) {
        setMany(filtered.map(x => x.name + "|"))

      }
      if (event.target.value == "") {
        setMany("")
        if (country !== undefined) setSelected(<Country
          country={countries.filter(x => x.alpha2Code == country)[0]} paint={paint} />)
      }
    }

  }

  return (
    <>{country !== undefined  //&& searched==""
      ?  (searched==""?<Country country={countries.filter(x => x.alpha2Code == country)[0]} paint={paint} />: selected)
      : ""}

      <div style={{ "text-align": "center" }}>
        <input placeholder="Search for the country" value={searched}
          onChange={handleNewSearched} />
        {many}
        {/*selected*/}



      </div>


    </>)
}
export default Filter
