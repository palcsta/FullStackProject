import React, { useState, useEffect } from 'react'

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

const apiPort = "3003"

const App = () => {

  const [notifMessage, setNotifMessage] = useState('')


  return (
    <>
      <Notification resObj={notifMessage} />
      <div class="container" style={p}>

        <LoginForm apiPort={apiPort} setNotifMessage={setNotifMessage}/>

        <Dropdown />

      </div><div class="container" style={p}><Footer /></div>
    </>
  )
}


export default App
