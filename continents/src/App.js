import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { MdLayersClear } from 'react-icons/md'
import { IconContext } from 'react-icons'

import Map3 from './components/Map3'
import CountriesDropdown from './components/Dropdown'
import CountryDetails from './components/CountryDetails'
import Filter from './components/Filter'
import { countriesService } from './services/countriesService'
import { relService } from './services/relService'
import { currencyService } from './services/currencyService'
import LoginForm from './components/LoginForm'
import SelectedFlags from './components/SelectedFlags'
import SaveBloc from './components/SaveBloc'
import Footer from './components/Footer'

import './styles/MapBottomButtons.css'
import './styles/SaveBloc.css'


const getNewColor = () => {
  const R = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  const G = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  const B = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
  return `#${R}${G}${B}`
}

function App() {

  const [selected, setSelected] = useState([])
  const [mapColor, setMapColor] = useState([])
  const [countries, setCountries] = useState([])
  const [showDetail, setShowDetail] = useState(null)
  const [user, setUser] = useState(null)
  const [blocs, setBlocs] = useState([])
  const [religions, setReligions] = useState([])
  const [currencies, setCurrencies] = useState([])


  useEffect(() => {
    const fetchCountries = async () => {
      await countriesService().then(res => {
        setCountries(res)
        //console.log("countries in fetching app",countries)
      })
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchReligions = async () => {
      await relService().then(res => {
        setReligions(res)
        // console.log("REL IN FETCH ",religions)
      })
    }
    fetchReligions()
  }, [])

  useEffect(() => {
    const fetchCurrency = async () => {
      await currencyService().then(res => {
        setCurrencies(res)
        // console.log("REL IN FETCH ",religions)
      })
    }
    fetchCurrency()
  }, [])


  const selectOne = (id) => {
    //console.log("selectOne called for ",id)
    if (selected.includes(id)) {
      //give it a new color
      setMapColor([...mapColor.filter(c => c.id !== id), { id: id, color: getNewColor() }])
    } else {
      setSelected([...selected, id])
      setMapColor([...mapColor, { id: id, color: getNewColor() }])
    }
    setShowDetail(id)
  }

  const deselectOne = (id) => {
    if (showDetail === id) {
      setShowDetail(null)
    }
    setSelected(selected.filter(c => c !== id))
    setMapColor(mapColor.filter(c => c.id !== id))
  }

  const deselectKeepDetails = (id) => {
    setSelected(selected.filter(c => c !== id))
    setMapColor(mapColor.filter(c => c.id !== id))
  }

  const selectMany = (ids) => {
    let ourColor = getNewColor()
    let newColors = ids.map(c => { return { id: c, color: ourColor } })
    setSelected([...selected.filter(s => !ids.includes(s)), ...ids])
    setMapColor([...mapColor.filter(c => !ids.includes(c.id)), ...newColors])
    /* old implementation that preserves existing colors
    let newColors = []
    let newSelections = []
    ids.forEach(country=>{
      if(!selected.includes(country)){
        newSelections.push(country)
        newColors.push({id:country,color:ourColor})
      }
    }) 
    setSelected([...selected,...newSelections])
    set MapColor([...mapColor,...newColors])
    */
  }

  const clickOne = (clickedId) => {
    if (selected.includes(clickedId)) {
      if (showDetail === clickedId) {
        setShowDetail(null)
        //console.log("showDetail:", showDetail)
      }
      setSelected(selected.filter(c => c !== clickedId))
      setMapColor(mapColor.filter(c => c.id !== clickedId))

    } else {
      setSelected([...selected, clickedId])
      setMapColor([...mapColor, { id: clickedId, color: getNewColor() }])
      //console.log("showing detail for ",clickedId)
      setShowDetail(clickedId)
    }
  }

  return (
    <div className="container" style={{ border: "2px solid cyan", borderRadius: "5px" }}>
      <LoginForm user={user} setUser={setUser} setBlocs={setBlocs} />
      <Filter countries={countries} showDetail={showDetail} setShowDetail={setShowDetail} selected={selected} setSelected={setSelected} dkd={deselectKeepDetails} />
      <CountryDetails countries={countries} religions={religions} currencies={currencies} showDetail={showDetail} mapColor={mapColor} selected={selected} selectOne={selectOne} dkd={deselectKeepDetails} />
      <CountriesDropdown countries={countries} setShowDetail={setShowDetail} blocs={blocs} selectOne={selectOne} selectMany={selectMany} />
      <Map3 mapColor={mapColor} clickOne={clickOne} />
      <div className="mapButtonGroup">
        <IconContext.Provider value={{ size: "1.25em", className: "saveButtonIcon" }}>
          <Button variant="warning" onClick={() => { setShowDetail(null); setSelected([]); setMapColor([]) }}><MdLayersClear/>Clear map</Button>
          <SaveBloc selected={selected} user={user} />
        </IconContext.Provider>
      </div>
      <SelectedFlags countries={countries} selected={selected} mapColor={mapColor} setShowDetail={setShowDetail} />
      <Footer />
    </div>
  )
}

export default App
