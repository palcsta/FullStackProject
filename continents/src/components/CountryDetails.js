import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    if (foundColorObj) {
      color = foundColorObj.color
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
  //const relUrl = "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-religion.json"




  let country = props.countries.find(c => c.alpha2Code.toLowerCase() === props.showDetail)
  let isSelected = props.selected.includes(props.showDetail)
  let rel = (country && props.religions) ? props.religions.filter(x => x.country == country.name) : "no religion data"
  let currency = (country && props.currencies) ? props.currencies.filter(x => country.name.includes(x.country)) : "no currency data"

  function calcTime(/*city, */offset) {
   // console.log("offset ",isNaN(offset))

    // create Date object for current location
    let d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    let nd = new Date()
    if(!isNaN(offset)){
     nd = new Date(utc + (3600000*offset));
    }else{
      nd = new Date(utc);
    }
    
   
    // return time as a string
    return nd.getHours()+":"+nd.getMinutes()//"time is " + nd.toString();

}

country && console.log(country.languages.map(x => {return <a target="_blank" href={"https://wikipedia.org/wiki/" + x.name + "_language"} key={x.name}><span>{x.name}</span></a>}))




  //const [religion, setReligion] = useState(country ? props.religions.filter(x => x.country==country.name): "no religion data")
  //const [currency, setCurrency] = useState(" no currency data...")
  const deselectMe = () => {
    props.dkd(country.alpha2Code.toLowerCase())
  }

  const selectMe = () => {
    props.selectOne(country.alpha2Code.toLowerCase())
  }


const quickstyle = {
  "lineHeight":"1em"
}

  return (
    <>

      {(props.showDetail && country && rel) &&
<Container style={{ paddingLeft: 0, paddingRight: 0 }} >
  <div style={style}>
  <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Col lg={true}>
      <h2><a target="_blank" rel="noopener noreferrer"
        href={`https://en.wikipedia.org/wiki/${country.name}`}> {country.name}</a>({country.alpha2Code}{country.nativeName==country.name?"":", "+country.nativeName})</h2>
      <p style={quickstyle}> 
       <b>capital:</b> {country.capital}
      </p>

    </Col>
  </Row>
  </div>
  <div style={style}>
  <Row>
    <Col xs={5} md={2}>
      <img style={{...flag,"margin":"0.5em"}}src={country.flag} alt="" width="150" height="100" ></img>

    </Col>
    <Col xs={5} md={3} style={{"marginLeft":"0.4em"}}>
      <i><b>pop.</b></i>: {numberChanger(country.population)}
              <br></br>
              <b>area:</b> {numberChanger(country.area)} km<sup>2</sup>
              <br></br>
              <b>region:</b> {country.subregion}
              <br></br>
              <b>time: </b>{calcTime(/*country.capital,*/country.timezones[0].substring(3,6)[0]+country.timezones[0].substring(3,6)[2])
              +"("+country.timezones[0]+")"
              }
    </Col>
    <Col xs={2} md={2} style={{"paddingTop":"0.2em"}}>
      
      <p style={quickstyle}><b><i>language(s): </i></b>
                {country.languages.map(x => {return <a target="_blank" href={"https://wikipedia.org/wiki/" + x.name + "_language"} key={x.name}><span>{x.name}</span></a>}).reduce((prev, curr) => [prev, ', ', curr])}</p>
      <p style={quickstyle}><b>Religion:</b>{rel[0] !== undefined ? rel[0].religion : " no data "}</p>
      <p style={quickstyle}><b>Currency: </b>{
                country.currencies[0].code
                
        }{country.currencies[0].symbol && `(${country.currencies[0].symbol})`}</p>

    </Col>
    <Col lg={true} style={{"textAlign":"center"}}>
      <Button style={{margin:"0.3rem"}} target="_blank" href={"https://youtube."+"com"+"/feed/trending?gl=" +country.alpha2Code} variant={"danger"}>YouTube<br></br>trending<br></br></Button>
            <Button style={{margin:"0.3rem"}} target="_blank" href={"https://www.google.com/maps/place/"+country.nativeName} variant={"success"}>find in <br></br>Google Maps</Button>
            <Button style={{margin:"0.3rem"}} variant={isSelected ? "outline-warning" : "outline-primary"}
              onClick={() => { isSelected ? deselectMe() : selectMe() }}>{isSelected ? <>Deselect<br></br>on map</> : <>Select<br></br>on map</>}</Button>
    </Col>
  </Row>
  </div> 
</Container>
      }
    </>
  )
}
export default CountryDetails
