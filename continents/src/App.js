import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

import Map3 from './components/Map3'
import CountriesDropdown from './components/Dropdown'
import CountryDetails from './components/CountryDetails'
import Filter from './components/Filter'
import { countriesService } from './services/countriesService'
import LoginForm from './components/LoginForm'
import SelectedFlags from './components/SelectedFlags'
import SaveBloc from './components/SaveBloc'
import Footer from './components/Footer'

function App() {

  const [selected,setSelected] = useState([])
  const [mapColor,setMapColor] = useState([])
  const [countries,setCountries] = useState([]) 
  const [showDetail, setShowDetail] = useState(null)
  const [user, setUser] = useState(null)
  const [blocs, setBlocs] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      await countriesService().then(res => {
        setCountries(res)
      })
    }
    fetchCountries()
  }, [])

  return (
    <div className="container" style={{border:"2px solid cyan",borderRadius:"5px"}}>
      <LoginForm user={user} setUser={setUser} setBlocs={setBlocs}/>
      <Filter countries={countries} showDetail={showDetail} setShowDetail={setShowDetail} selected={selected} setSelected={setSelected} />
      <CountryDetails countries={countries} showDetail={showDetail} setShowDetail={setShowDetail} mapColor={mapColor} selected={selected} setSelected={setSelected}/>
      <CountriesDropdown countries={countries} selected={selected} setSelected={setSelected} setShowDetail={setShowDetail} blocs={blocs} />
      <Map3 selected={selected} setSelected={setSelected} mapColor={mapColor} setMapColor={setMapColor} setShowDetail={setShowDetail} />
      <div>
        <Button variant="warning" onClick={()=>{setSelected([]);setMapColor([])}}>Clear map</Button>
        <SaveBloc selected={selected} user={user}/>
      </div>
      <SelectedFlags countries={countries} selected={selected} setSelected={setSelected} mapColor={mapColor} setShowDetail={setShowDetail} />
      <Footer />
    </div>
  )
}

export default App
