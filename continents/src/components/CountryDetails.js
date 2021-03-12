import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const numberChanger = (number) => {
  if (number == null) return (<>-</>)
  let filtered = number.toString()
  // + " " + number.substring(1, 4) + " " + number.substring(5, 6)
  if (filtered.length === 4) filtered = (filtered.substring(0, 1) + " " + filtered.substring(1))
  else if (filtered.length === 5) filtered = (filtered.substring(0, 2) + " " + filtered.substring(2))
  else if (filtered.length === 6) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3))
  else if (filtered.length === 7) filtered = (filtered.charAt(0) + " " + filtered.substring(1, 4) + " " + filtered.substring(4))
  else if (filtered.length === 8) filtered = (filtered.substring(0, 2) + " " + filtered.substring(2, 5) + " " + filtered.substring(5))
  else if (filtered.length === 9) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3, 6) + " " + filtered.substring(6))
  else if (filtered.length === 9) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3, 6) + " " + filtered.substring(6))
  else if (filtered.length === 10) filtered = (filtered.substring(0, 1) + " " + filtered.substring(1, 4) + " " + filtered.substring(4, 7) + " " + filtered.substring(7))
  return (<>{filtered}</>)

}

const l = {
  "paddingLeft": "3em"
}


const CountryDetails = (props) => {

  let color = "black"
  if (props.showDetail) {
    let foundColorObj = props.mapColor.find(e => e.id === props.showDetail)
    if(foundColorObj){
      color=foundColorObj.color
    }
  } 

  const style = {
    display: 'flex',
    border: '3px solid ' + color,
    align: "center",
    "borderRadius": "10px"
  }

  const flag = {
    border: '2px solid black',
    "borderRadius": "5px",
    width: "175",
    height: "120"
  }

  const [religion, setReligion] = useState(" no religion data...")
  const [currency, setCurrency] = useState(" no currency data...")


  let country = props.countries.find(c => c.alpha2Code.toLowerCase() === props.showDetail)
  let isSelected = props.selected.includes(props.showDetail)

  const deselectMe = () => {
    props.dkd(country.alpha2Code.toLowerCase())
  }

  const selectMe = () => {
    props.selectOne(country.alpha2Code.toLowerCase())
  }

  const content = () => {
    if(props.showDetail&&country){
      return (
        <>
          <div style={style}> <div><h2><a target="_blank" rel="noopener noreferrer"
            href={`https://en.wikipedia.org/wiki/${country.name}`}> {country.name}({country.alpha2Code})</a></h2>
            <b>capital:</b> {country.capital}</div>
          </div>

          <div style={style}>
            <img style={flag} src={country.flag} alt="" width="150" height="100" ></img>


            <div>
              <i><b>population</b></i>: {numberChanger(country.population)}
              <br></br>
              <b>area:</b> {numberChanger(country.area)} km<sup>2</sup>
              <br></br>
              <b>region:</b> {country.subregion}
              <br></br>
              <b>time:</b>{country.timezones[0]}
            </div>

            <div>
              <b><i> <span style={l}>language(s):</span></i></b>
              {country.languages.map(x => <>|
                <a href={"https://wikipedia.org/wiki/" + x.name + "_language"} key={x.name}>{x.name}</a>| </>)}
              <div>
                <n><b><span style={l}>Religion:</span></b>{religion}</n>
                <br></br>
                <n><b><span style={l}>Currency:</span></b>{currency}</n>
                <button hidden onClick={() => props.setShowDetail(null)}>hide</button>
              </div>

            </div>

            <Button variant={isSelected?"outline-warning":"outline-primary"} style={{"float": "right","height":"2em","marginLeft":"30%","transform":"translateY(100%)"}} onClick={()=>{isSelected?deselectMe():selectMe()}}>{isSelected?"Deselect ":"Select "}</Button> 
          </div>
        </>
      )
    } else {
      return (<></>)
    }
  }

  return (
    <>
      {content()}
    </>
  )
}
export default CountryDetails
