/*
const Country = ({ country }) => {
    if (!country) {
      return null
    }
  
    if (!country.found) {
      return (
        <div>
          not found...
        </div>
      )
    }
    const p = {
        "border": "1px solid black",
        "border-radius": "3px"
      }
    return (
      <div>
        <h3>{country.name} </h3>
        <div><i>capital:</i> {country.capital} </div>
        <div><i>population:</i> {country.population}</div> 
        <img style={p}src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
      </div>
    )
  }

  export default  Country
*/


  import React, { useState } from 'react';

//import './Style.css';
//import Weather from './Weather';
//import { SvgLoader, SvgProxy } from "react-svgmt";
//var aestTime = new Date().toLocaleString("gb-GB", {timeZone: "Finland"});
//aestTime = new Date(aestTime);

const style = {
    display: 'flex',
    border: '3px solid black',
    align: "center",
    "border-radius": "10px"
};
const flag = {
    //display: 'flex',
    border: '2px solid black',
    "border-radius": "5px",
    width: "175",
    height: "120"
};

// china : 1377422166
const numberChanger = (number) => {
    if (number == null) return (<>-</>)
    let filtered = number.toString()
    // + " " + number.substring(1, 4) + " " + number.substring(5, 6)
    if (filtered.length == 4) filtered = (filtered.substring(0, 1) + " " + filtered.substring(1))
    else if (filtered.length == 5) filtered = (filtered.substring(0, 2) + " " + filtered.substring(2))
    else if (filtered.length == 6) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3))
    else if (filtered.length == 7) filtered = (filtered.charAt(0) + " " + filtered.substring(1, 4) + " " + filtered.substring(4))
    else if (filtered.length == 8) filtered = (filtered.substring(0, 2) + " " + filtered.substring(2, 5) + " " + filtered.substring(5))
    else if (filtered.length == 9) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3, 6) + " " + filtered.substring(6))
    else if (filtered.length == 9) filtered = (filtered.substring(0, 3) + " " + filtered.substring(3, 6) + " " + filtered.substring(6))
    else if (filtered.length == 10) filtered = (filtered.substring(0, 1) + " " + filtered.substring(1, 4) + " " + filtered.substring(4, 7) + " " + filtered.substring(7))
    //console.log('filtered_number', filtered)
    return (<>{filtered}</>)

}

const l = {
    "padding-left": "3em"
}


const Country = ({ country }) => {

    const [religion, setReligion] = useState(" no religion data...")
    const [currency, setCurrency] = useState(" no currency data...")
    if(country===null){
      return(<></>)
    }


    let whatToShow = country !== undefined
        ? <><div style={style}> <div><h2><a target="_blank" rel="noopener noreferrer"
            href={"https://en.wikipedia.org/wiki/" + country.name} >{country.name}({country.alpha2Code})</a></h2>
            <b > capital:</b> {country.capital}</div>
            
        </div>

            <div style={style}>

                <img style={flag} src={country.flag} alt=""
                    width="150" height="100" >
                </img>

                
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

                    <><b><i> <span style={l}>language(s):</span></i></b></>
                    {country.languages.map(x => <>|
                    <a href={"https://wikipedia.org/wiki/"+x.name+"_language"} key={x.name}>{x.name}</a>| </>)}
                    <div>
                        <n><b><span style={l}>Religion:</span></b>{religion}</n>
                        <br></br>
                        <n><b><span style={l}>Currency:</span></b>{currency}</n>
                    </div>
                </div>





                {/*hovered || harded ? <SvgLoader pwidth="1200" height="480" path={"https://raw.githubusercontent.com/flekschas/simple-world-map/master/world-map.svg"}>
                   
                   <SvgProxy selector={"#"+country.alpha2Code.toLowerCase()} fill="red" />
               

                   
                   
                </SvgLoader> : <></>*/}





            </div></>
        : "too many or nothing to show"
    return (
        <>{whatToShow}</>
    );
};
export default Country;
