import React, { useState,useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Countries from './Countries'
import Filter from './Filter'
import axios from 'axios'
import Map from './map.js'

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

function getColor() {
    const R = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
    const G = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
    const B = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
    return `#${R}${G}${B}`
}


//const color = getColor()



const Dropdwn = () => {
    const [filtered, setFiltered] = useState([])   
    const [countries, setCountries] = useState([])




    const paint = () => {
        let error = ""
        var i;
       
       
        if (document.querySelector('g') !== null && filtered !== undefined && filtered.length !== 0) {
           
            const color = getColor()
            const painted = []
            const region = []
            const subregion = []
            
            for (i = 0; i < filtered.length; i++) {
                if (document.getElementById(filtered[i].alpha2Code.toLowerCase()) !== null) {
                    painted.push(document.getElementById(filtered[i].alpha2Code.toLowerCase()).style.fill)
                    region.push(filtered[i].region)
                    subregion.push(filtered[i].subregion)
                }
            if (true) {
                for (i = 0; i < filtered.length; i++) {
    
                    if (document.getElementById(filtered[i].alpha2Code.toLowerCase()) !== null) {
                        document.getElementById(filtered[i].alpha2Code.toLowerCase()).style.fill = color
                    }
                    if (document.getElementById(filtered[i].alpha2Code.toLowerCase()) == null)
                        error += ", " + filtered[i].name
                }
            }
    
            console.log("Sorry! These countries are too small to be shown on this map: ", error)
    
        }
    }

    }





const hook = () => {
   // console.log('effect countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
       // console.log(countries)
     
      })
  }
  //hook()
  useEffect(hook, [])

    const continents = countries.filter(x => x.region !== "Polar").map(x => x.region).filter(unique)

    const polar = countries.filter(x => x.region === "Polar").map(x => x.name)
    const other = countries.filter(x => x.region === "").map(x => x.name)
    //const polar = data.filter(x => x.region == "Americas")

    //console.log('sub-continents in dropdown: ', polar)
    //console.log("data in dropdown: ", noContinent)
    return (<>
    {/*<Filter countries={countries}/>*/}
        <div align="center" class="panel-footer " split>
            <DropdownButton id="dropdown-basic-button" title="Browse" split>
                {continents.filter(x => x !== "").map(x => <>
                    <div align="center" class="panel-footer " split>
                        <Dropdown >
                            <Button onClick={() => setFiltered(
                                countries.filter(r => r.region === x)

                            )} variant="info">{x}</Button>
                            <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                            <Dropdown.Menu className="super-colors">

                                {countries.filter(y => y.region.includes(x)).map(x => x.subregion)
                                    .filter(unique).map(z =>
                                        <>
                                            <Dropdown >
                                                <Button
                                                    onClick={() => setFiltered(
                                                        countries.filter(g => g.subregion === z))}
                                                    variant="info">{"   " + z}</Button>
                                                <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                                                <Dropdown.Menu className="super-colors">
                                                    {countries.filter(a => a.subregion == z).map(b =>
                                                        <><Dropdown.Item
                                                            onClick={() => setFiltered(
                                                                countries.filter(q => q.name === b.name)
                                                            )}
                                                        >{b.name}</Dropdown.Item></>)}


                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown.Divider />
                                        </>)}




                            </Dropdown.Menu>
                        </Dropdown></div>
                    <Dropdown.Divider />



                </>)}

                <Dropdown.Divider />
                <DropdownButton variant="info" id="dropdown-basic-button" title="Other">
                    {other.map(x => <><Dropdown.Item onClick={() => setFiltered(
                        countries.filter(q => q.name === x)
                    )
                    }>{x}</Dropdown.Item></>)}
                    {polar.map(x => <><Dropdown.Item onClick={() => setFiltered(
                        countries.filter(q => q.name === x)
                    )
                    }>{x + "(Polar)"}</Dropdown.Item></>)}
                </DropdownButton>
            </DropdownButton>



            {paint()}
            {/*<Countries countries={filtered}/>*/}
            {/*<Filter countries={countries} filter={filtered}/>*/}
            {<Map showing={filtered} countries={countries}/>}



        </div></>);
}

export default Dropdwn;