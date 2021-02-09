import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Footer from './components/Footer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import LoginForm from './components/login'
import Notification from './components/Notification'
import Filter from './components/Filter';
import Dropdown from './components/Dropdwn'

import Countries from './components/Countries';

const p = {
  "border": "2px solid cyan",
  "border-radius": "5px"
}

const App = () => {

  const [notifMessage, setNotifMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    const loginObject = {"username":username,"password":password}
    console.log("loginObject", loginObject)
    const url = `api/login`
    axios.post(url,loginObject,{baseURL: 'http://localhost:3003'}).then(response => {
      console.log(`login response: ${response.data} `)
      setNotifMessage(response.data)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }).catch(error => {
      console.log(`login error: ${error}, response: ${error.response.data.error} , can register this user: ${error.response.data.canReg} `)
      setNotifMessage(error.response.data)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    })
  }

  const [searched, setNewSearched] = useState('')
  const [countries, setCountries] = useState([])

  const [filteredCountries, setFilteredCountries] = useState(countries)

  const [showTen, setShowTen] = useState(true)
  const [showOne, setShowOne] = useState(false)

  const hook = () => {
    console.log('effect countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log('got countries (size; ', countries.length, ")")
      })
  }

  useEffect(hook, [])

  const handleNewSearched = (event) => {
    console.log("event ", event)

    let filtered = countries.filter(
      x =>
      x.name.toUpperCase().includes(
        event.target.value.toUpperCase()))
    event.preventDefault()
    setNewSearched(event.target.value)
    setFilteredCountries(filtered)
    setShowTen(filtered.length < 1000)
    setShowOne(filtered.length === 1 && filtered !== [])
  }

  return (
    <>
      <Notification resObj={notifMessage} />
      <div class="container" style={p}>

        <LoginForm setLoginUser={setUsername} setLoginPass={setPassword} login={login}/>
        <Dropdown data={countries}/>

        <Filter value={searched} change={handleNewSearched} />

        <Countries countries={filteredCountries}
          one={showOne}
          ten={showTen} />

      </div><div class="container" style={p}><Footer /></div>
    </>
  )
}


export default App
