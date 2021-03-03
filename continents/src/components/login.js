import React, {useEffect} from 'react'
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

  const pressLogout = (event) => {
    event.preventDefault()
    console.log("pressed logout")
    props.logout()
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

  const hideWhenLoggedOut = {display:props.user?"inline":"none"}
  const hideWhenLoggedIn = {display:props.user?"none":"inline"}

  return (
    <>
      <div style={hideWhenLoggedOut}>
        <form onSubmit={pressLogout}>
          <span>Logged in as {props.user?props.user.username:""}</span>
          <button type="submit" className="fauxlinkbutton">Logout</button>
        </form>
      </div>
      <div style={hideWhenLoggedIn}>
        <form onSubmit={pressLogin}>
          <IconContext.Provider value={{ size: "1.25em", className: "loginIcon" }}>
            <span><MdAccountCircle /><input placeholder="Username" onChange={handleLoginFormUserChange} /></span>
            <span><MdVpnKey /><input placeholder="Password" type="password" onChange={handleLoginFormPassChange}/></span>
            <span style={{display:props.showReg?"inline":"none"}}><MdVpnKey /><input placeholder="Confirm Password"type="password" onChange={handleRegPassConfirmChange}/></span>
            <button type="submit" className="fauxlinkbutton">{props.showReg?"Register":"Login/ Register"}</button>
          </IconContext.Provider>
        </form>   
      </div>
    </>
  )
}

export default LoginForm
