import React, { useState,useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Countries from './Countries'
import Filter from './Filter'
import axios from 'axios'


const unique = (value, index, self) => {
    return self.indexOf(value) === index
}


const Dropdwn = () => {
    const [filtered, setFiltered] = useState([])   
    const [countries, setCountries] = useState([])

const hook = () => {
   // console.log('effect countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
       // console.log(countries)
     
      })
  }

  useEffect(hook, [])

    const continents = countries.filter(x => x.region !== "Polar").map(x => x.region).filter(unique)

    const polar = countries.filter(x => x.region === "Polar").map(x => x.name)
    const other = countries.filter(x => x.region === "").map(x => x.name)
    //const polar = data.filter(x => x.region == "Americas")

    //console.log('sub-continents in dropdown: ', polar)
    //console.log("data in dropdown: ", noContinent)
    return (<>
    <Filter countries={countries}/>
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




            <Countries countries={filtered}               
            />



        </div></>);
}

export default Dropdwn;