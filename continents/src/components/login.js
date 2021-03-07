import React, {useState,useEffect} from 'react'
import { MdAccountCircle, MdVpnKey } from 'react-icons/md'
import { IconContext } from 'react-icons'
import '../styles/login.css'
import axios from 'axios'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showReg, setShowReg] = useState(false)
  const [regPassConfirm, setRegPassConfirm] = useState('')
  const [user, setUser]=useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedContinentsUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const login = () => {
    const loginObject = {"username":username,"password":password}
    const url = `api/login`
    axios.post(url,loginObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${props.apiPort}`}).then(response => {
      if(response.data.token){
        let user = {token:response.data.token,username:username}
        window.localStorage.setItem(
          'loggedContinentsUser', JSON.stringify(user)
        ) 
        setUser(user)
      }else{
        setUser(null)
      }
      //for setting token to bloc? pass setToken to here via props
      //setToken(response.data.token)
      props.setNotifMessage(response.data)
      setTimeout(() => {
        props.setNotifMessage(null)
      }, 5000)
    }).catch(error => {
      //console.log(`login error: ${error}, response: ${error.response.data.error} , can register this user: ${error.response.data.canReg} `)
      props.setNotifMessage(error.response.data.canReg?{info:"Re-enter your password to register"}:error.response.data)
      setTimeout(() => {
        props.setNotifMessage(null)
      }, 5000)
      setShowReg(error.response.data.canReg)
    })
  }

  const register = () => {
    if(regPassConfirm === password){
      const regObject= {"username":username,"password":password}
      const registerUrl = `api/register`

      axios.post(registerUrl,regObject,{baseURL: `${window.location.protocol}//${window.location.hostname}:${props.apiPort}`}).then(response => {
        //console.log(`login response: ${response.data} `)
        setShowReg(false)
        props.setNotifMessage(response.data)
        setTimeout(() => {
          props.setNotifMessage(null)
        }, 5000)
      }).catch(error => {
        //todo: show all errors
        let changeMe = Array.isArray(error.response.data)?error.response.data[0]:error.response.data
        console.log(`register error: ${error}, response: ${changeMe.error}`)
        props.setNotifMessage(changeMe)
        setTimeout(() => {
          props.setNotifMessage(null)
        }, 5000)
      })
    }else{
      props.setNotifMessage({error:"The passwords did not match"})
    }
  }

  const pressLogin = (event) => {
    event.preventDefault()
    showReg?register():login()
  }

  const pressLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedContinentsUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLoginFormUserChange = (event) => {
    setShowReg(false)
    setUsername(event.target.value)
  }

  const handleLoginFormPassChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRegPassConfirmChange = (event) => {
    setRegPassConfirm(event.target.value)
  }

  //const hideWhenLoggedOut = {display:user?"inline":"none"}
  //const hideWhenLoggedIn = {display:user?"none":"inline"}

  const loggedInContent = () => (
    <div>
      <form onSubmit={pressLogout}>
        <span>Logged in as {user?user.username:""}</span>
        <button type="submit" className="fauxlinkbutton">Logout</button>
      </form>
    </div>
  )

  const loggedOutContent = () => (
    <div>
      <form onSubmit={pressLogin}>
        <IconContext.Provider value={{ size: "1.25em", className: "loginIcon" }}>
          <span><MdAccountCircle /><input placeholder="Username" onChange={handleLoginFormUserChange} /></span>
          <span><MdVpnKey /><input placeholder="Password" type="password" onChange={handleLoginFormPassChange}/></span>
          <span style={{display:showReg?"inline":"none"}}><MdVpnKey /><input placeholder="Confirm Password"type="password" onChange={handleRegPassConfirmChange}/></span>
          <button type="submit" className="fauxlinkbutton">{showReg?"Register":"Login/ Register"}</button>
        </IconContext.Provider>
      </form>   
    </div>
  )

  return (
    <>
      {user?loggedInContent():loggedOutContent()}
    </>
  )
}

export default LoginForm
