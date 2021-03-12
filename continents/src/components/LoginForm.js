import React, {useState,useEffect} from 'react'
import { MdAccountCircle, MdVpnKey } from 'react-icons/md'
import { IconContext } from 'react-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Container, Row, Col } from 'react-bootstrap'

import '../styles/login.css'
import { loginService, registerService } from '../services/loginService'
import { getBlocsService } from '../services/blocService'


const LoginForm = (props) => {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showReg, setShowReg] = useState(false)
  const [regPassConfirm, setRegPassConfirm] = useState('')

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedContinentsUser')
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON)
      props.setUser(loggedInUser)
      const fetchBlocs = async () => {
        await getBlocsService(`bearer ${loggedInUser.token}`).then(res => {
          console.log("got blocs: ",res)
          props.setBlocs(res)
        })
      }
      fetchBlocs()
    }
  }, [])

  /* there's no clientside verification
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }
  */

  const login = async () => {
    const loginObject = {"username":username,"password":password}
    await loginService(loginObject).then(res => { 
      if(res.token){
        props.setUser({token:res.token,username:username})
        window.localStorage.setItem('loggedContinentsUser', JSON.stringify({token:res.token,username:username})) 
        const fetchBlocs = async () => {
          await getBlocsService(`bearer ${res.token}`).then(res => {
            console.log("got blocs because user pressed login: ",res)
            props.setBlocs(res)
          })
        }
        fetchBlocs()
      }else{
        props.setUser(null)
        console.log("didnt get token, response was: ",res)
      }
      //for setting token to bloc? pass setToken to here via props
      //setToken(response.data.token)
      let hasProblem = Array.isArray(res) && res.some(o => o.error)
      console.log("problem(s): ",hasProblem)
      console.log("res: ",res)
      let weCanReg = Array.isArray(res) && res.find(o => "canReg" in o).canReg
      console.log("weCanReg: ",weCanReg)
      //props.setNotifMessage(response.data))
      //setTimeout(() => {
      //props.setNotifMessage(null)
      //}, 5000)
      //}).catch(error => {
      //console.log(`login error: ${error}, response: ${error.response.data.error} , can register this user: ${error.response.data.canReg} `)
      //props.setNotifMessage(error.response.data.canReg?{info:"Re-enter your password to register"}:error.response.data)
      //setTimeout(() => {
      //props.setNotifMessage(null)
      //}, 5000)
      setShowReg(weCanReg)
    }
    )}

  const register = async () => {
    if(regPassConfirm === password){
      const regObject= {"username":username,"password":password}
      const dataResponse = await registerService(regObject)
      if(!dataResponse.error){
        //console.log(`register response: ${response.data} `)
        setShowReg(false)
        //props.setNotifMessage(response.data)
        //setTimeout(() => {
        //props.setNotifMessage(null)
        //}, 5000)
        //}).catch(error => {
        //todo: show all errors
        //props.setNotifMessage(changeMe)
        //setTimeout(() => {
        //props.setNotifMessage(null)
        // }, 5000)
      }
    }else{
      //props.setNotifMessage({error:"The passwords did not match"})
    }
  }

  const pressLogin = (event) => {
    event.preventDefault()
    console.log("we pressed login on the new form?")
    showReg?register():login()
  }

  const pressLogout = () => {
    window.localStorage.removeItem('loggedContinentsUser')
    props.setUser(null)
    setUsername('')
    setPassword('')
    props.setBlocs([])
  }

  const handleLoginFormUserChange = (event) => {
    event.preventDefault()
    setShowReg(false)
    setUsername(event.target.value)
  }

  const handleLoginFormPassChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRegPassConfirmChange = (event) => {
    setRegPassConfirm(event.target.value)
  }


  const loggedOutContent = (

    <IconContext.Provider value={{ size: "1.25em"}}>
    <Form noValidate validated={validated} onSubmit={(event)=>pressLogin(event)}>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend"><MdAccountCircle/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={handleLoginFormUserChange} 
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomPassword">
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <InputGroup.Text id="passwordInputGroupPrepend"><MdVpnKey/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleLoginFormPassChange}
            />
            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomPasswordConfirm" style={{display:showReg?"inline":"none"}}>
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <InputGroup.Text id="passwordConfirmInputGroupPrepend"><MdVpnKey/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={handleRegPassConfirmChange}
            />
            <Form.Control.Feedback type="invalid">Passwords must match.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md={showReg?"1":"2"}>
          <Button variant={showReg?"outline-primary":"link"} type="submit" >{showReg?"Register":"Login/ Register"}</Button>
        </Form.Group>
        <Form.Group as={Col} md="1">
          <Button variant="outline-secondary" onClick={()=>setShowReg(false)} style={{display:showReg?"inline":"none"}}>Cancel</Button>
        </Form.Group>
      </Form.Row>
    </Form>
      </IconContext.Provider> 
  )

  const loggedInContent = (
    <div>
      <form onSubmit={pressLogout}>
        <span>Logged in as {props.user?props.user.username:""}</span>
        <button type="submit" className="fauxlinkbutton">Logout</button>
      </form>
    </div>
  )

  return (
    <>
      {props.user?loggedInContent:loggedOutContent}
    </>
  )
}

/*

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showReg, setShowReg] = useState(false)
  const [regPassConfirm, setRegPassConfirm] = useState('')


  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedContinentsUser')
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON)
      props.setUser(loggedInUser)
      const fetchBlocs = async () => {
        await getBlocsService(`bearer ${loggedInUser.token}`).then(res => {
          console.log("got blocs: ",res)
          props.setBlocs(res)
        })
      }
      fetchBlocs()
    }
  }, [])

  const login = async () => {
    const loginObject = {"username":username,"password":password}
    await loginService(loginObject).then(res => { 
      if(res.token){
        props.setUser({token:res.token,username:username})
        window.localStorage.setItem('loggedContinentsUser', JSON.stringify({token:res.token,username:username})) 
        const fetchBlocs = async () => {
          await getBlocsService(`bearer ${res.token}`).then(res => {
            console.log("got blocs because user pressed login: ",res)
            props.setBlocs(res)
          })
        }
        fetchBlocs()
      }else{
        props.setUser(null)
        console.log("didnt get token, response was: ",res)
      }
      //for setting token to bloc? pass setToken to here via props
      //setToken(response.data.token)
      //props.setNotifMessage(response.data)
      //setTimeout(() => {
      //props.setNotifMessage(null)
      //}, 5000)
      //}).catch(error => {
      //console.log(`login error: ${error}, response: ${error.response.data.error} , can register this user: ${error.response.data.canReg} `)
      //props.setNotifMessage(error.response.data.canReg?{info:"Re-enter your password to register"}:error.response.data)
      //setTimeout(() => {
      //props.setNotifMessage(null)
      //}, 5000)
      setShowReg(res.canReg)
    }
    )}


  const register = async () => {
    if(regPassConfirm === password){
      const regObject= {"username":username,"password":password}
      const dataResponse = await registerService(regObject)
      if(!dataResponse.error){
        //console.log(`register response: ${response.data} `)
        setShowReg(false)
        //props.setNotifMessage(response.data)
        //setTimeout(() => {
        //props.setNotifMessage(null)
        //}, 5000)
        //}).catch(error => {
        //todo: show all errors
        //props.setNotifMessage(changeMe)
        //setTimeout(() => {
        //props.setNotifMessage(null)
        // }, 5000)
      }
    }else{
      //props.setNotifMessage({error:"The passwords did not match"})
    }
  }

  const pressLogin = (event) => {
    event.preventDefault()
    showReg?register():login()
  }

  const pressLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedContinentsUser')
    props.setUser(null)
    setUsername('')
    setPassword('')
    props.setBlocs([])
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

  const loggedInContent = (
    <div>
      <form onSubmit={pressLogout}>
        <span>Logged in as {props.user?props.user.username:""}</span>
        <button type="submit" className="fauxlinkbutton">Logout</button>
      </form>
    </div>
  )

  const loggedOutContent = (
    <div>
      <form onSubmit={pressLogin}>
        <IconContext.Provider value={{ size: "1.25em", className: "loginIcon" }}>
          <span><MdAccountCircle /><input placeholder="Username" onChange={handleLoginFormUserChange} /></span>
          <span><MdVpnKey /><input placeholder="Password" type="password" onChange={handleLoginFormPassChange}/></span>
          <span style={{display:showReg?"inline":"none"}}><MdVpnKey /><input placeholder="Confirm Password"type="password" onChange={handleRegPassConfirmChange}/></span>
          <button type="submit" className="fauxlinkbutton">{showReg?"Register":"Login/ Register"}</button>
        </IconContext.Provider>
      </form>   
      <div>
        <NewLoginForm {...props}/>
      </div>
    </div>
  )

  return (
    <>
      {props.user?loggedInContent:loggedOutContent}
    </>
  )
}
*/
export default LoginForm
