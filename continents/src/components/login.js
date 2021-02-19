import React from 'react'
import { MdAccountCircle, MdVpnKey } from 'react-icons/md'
import { IconContext } from 'react-icons'
import '../styles/login.css'

const LoginForm = (props) => {
  const p = {
    "border": "1px solid black",
    "border-radius": "3px"
  }

  const pressLogin = (event) => {
    event.preventDefault()
    console.log("pressed login form button")
    props.showReg?props.register():props.login()
  }

  const handleLoginFormUserChange = (event) => {
    //console.log('about to submit user ',event.target.value)
    props.setLoginUser(event.target.value)
  }

  const handleLoginFormPassChange = (event) => {
    //console.log('about to submit pass ',event.target.value)
    props.setLoginPass(event.target.value)
  }

  const handleRegPassConfirmChange = (event) => {
    console.log('second pass ',event.target.value)
    props.setRegPassConfirm(event.target.value)
  }

  return (
    <div>
      <form onSubmit={pressLogin}>
        <IconContext.Provider value={{ size: "1.25em", className: "loginIcon" }}>
          <span><MdAccountCircle /><input placeholder="Username" onChange={handleLoginFormUserChange} /></span>
          <span><MdVpnKey /><input placeholder="Password" type="password" onChange={handleLoginFormPassChange}/></span>
          <span style={{display:props.showReg?"inline":"none"}}><MdVpnKey /><input placeholder="Confirm Password"type="password" onChange={handleRegPassConfirmChange}/></span>
          <button type="submit">{props.showReg?"Register":"Login/ Register"}</button>
        </IconContext.Provider>
      </form>   
    </div>
  )
}

export default LoginForm
