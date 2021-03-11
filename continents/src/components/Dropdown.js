import React from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

const getA2 = (country) => {
  return country.alpha2Code.toLowerCase()
}

const CountriesDropdown = (props) => {

  const continents = props.countries.filter(x => x.region !== "Polar").map(x => x.region).filter(unique)

  const polar = props.countries.filter(x => x.region === "Polar").map(x => x.name)
  const other = props.countries.filter(x => x.region === "").map(x => x.name)

  return (
    <>
      <div align="center" className="panel-footer " split="true">
        <DropdownButton id="dropdown-basic-button" title="Browse" split="true">
          {continents.filter(x => x !== "").map(x => 
          <>
            <div key={x} align="center" className="panel-footer " split="true">
              <Dropdown >
                <Button onClick={() => {
                  let matchingRegion = props.countries.filter(r => r.region === x)
                  console.log("selecting ",matchingRegion)
                  let selection = []
                  matchingRegion.forEach(match => selection.push(getA2(match)))
                  console.log("selecting alphacodes ",selection)
                  props.setSelected([...props.selected,...selection]
                  )}} variant="info">{x}</Button>
                <Dropdown.Toggle split="true" variant="success" id="dropdown-custom-2" />
                <Dropdown.Menu className="super-colors">

                  {props.countries.filter(y => y.region.includes(x)).map(x => x.subregion)
                      .filter(unique).map(z =>
                        <>
                          <Dropdown key={z}>
                            <Button onClick={() => {
                              let matchingSubregion = props.countries.filter(g => g.subregion === z)
                              console.log("selecting ", matchingSubregion)
                              let selection = []
                              matchingSubregion.forEach(match => selection.push(getA2(match)))
                              console.log("selecting alphacodes ",selection)
                              props.setSelected([...props.selected,...selection])}} variant="info">{"   " + z}
                            </Button>
                            <Dropdown.Toggle split="true" variant="success" id="dropdown-custom-2" />
                            <Dropdown.Menu className="super-colors">
                              {props.countries.filter(a => a.subregion === z).map(b =>
                              <>
                                <Dropdown.Item 
                                  key={b.name}
                                  onClick={() => {
                                    let matchingCountry = props.countries.filter(q => q.name === b.name)
                                    console.log("selecting one country?",matchingCountry)
                                    let selection = []
                                      matchingCountry.forEach(match => selection.push(getA2(match)))
                                    console.log("selecting alphacodes ",selection)
                                    props.setSelected([...props.selected,...selection])
                                    console.log("dropdown setting showDetail to ",selection[0])
                                    props.setShowDetail(selection[0])
                                    }
                                  }>
                                  {b.name}
                                </Dropdown.Item></>)}
                            </Dropdown.Menu>
                          </Dropdown>
                          <Dropdown.Divider />
                        </>
                      )}

                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Dropdown.Divider />
          </>
          )}
          <DropdownButton variant="info" id="dropdown-basic-button" title="Other">
            {other.map(x => <><Dropdown.Item key={x} onClick={() => {
              let matchingOther = props.countries.filter(q => q.name === x)
              console.log("selecting ",matchingOther)
              let selection = []
              matchingOther.forEach(match => selection.push(getA2(match)))
              props.setShowDetail(selection[0])
              props.setSelected([...props.selected,...selection])
            }}>{x}</Dropdown.Item></>)}
            {polar.map(x => <><Dropdown.Item key={x} onClick={() => {
              let matchingPolar = props.countries.filter(q => q.name === x)
              console.log("selecting one?",matchingPolar)
              let selection = []
              matchingPolar.forEach(match => selection.push(getA2(match)))
              props.setShowDetail(selection[0])
              props.setSelected([...props.selected,...selection])
            }}>{x + "(Polar)"}</Dropdown.Item></>)}
          </DropdownButton>
            <Dropdown.Divider />
          <DropdownButton variant="info" id="dropdown-basic-button" title="User's blocs">
            {props.blocs.map(x => <><Dropdown.Item key={x.id} onClick={() => {
              let matchingBloc = x.data.countries
              console.log("selecting ",matchingBloc)
              props.setSelected([...props.selected,...matchingBloc])
            }}>{x.data.name}</Dropdown.Item></>)}
          </DropdownButton>
        </DropdownButton>
      </div></>
  )}
export default CountriesDropdown
