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
  const [usernameErrors, setUsernameErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [loginProblems, setLoginProblems] = useState([])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedContinentsUser')
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON)
      props.setUser(loggedInUser)
      const fetchBlocs = async () => {
        await getBlocsService(`bearer ${loggedInUser.token}`).then(res => {
          //console.log("got blocs: ",res)
          props.setBlocs(res)
        })
      }
      fetchBlocs()
    }
  }, [])

  const login = async () => {
    setValidated(false)
    const loginObject = {"username":username,"password":password}
    await loginService(loginObject).then(res => { 
      const objWithToken = res.find(o=>"token" in o)
      if(objWithToken){
        props.setUser({token:objWithToken.token,username:username})
        window.localStorage.setItem('loggedContinentsUser', JSON.stringify({token:objWithToken.token,username:username})) 
        const fetchBlocs = async () => {
          await getBlocsService(`bearer ${objWithToken.token}`).then(bres => {
            //console.log("got blocs because user pressed login: ",res)
            props.setBlocs(bres)
          })
        }
        fetchBlocs()
      }else{
        props.setUser(null)
      }
      let hasProblem = Array.isArray(res) && res.some(o => o.error)
      let weCanReg = res.find(o => "canReg" in o) && res.find(o => "canReg" in o).canReg
      setLoginProblems(res.filter(o=>o.concerning==="login"))
      setShowReg(weCanReg)
      setValidated(!weCanReg && !res.filter(o=>o.concerning==="login"))
    })
  }
  

  const register = async () => {
    //console.log("tried to register with the new form")
    if(regPassConfirm === password){
      const regObject= {"username":username,"password":password}
      const dataResponse = await registerService(regObject)
      //console.log("data response from register is array: ",Array.isArray(dataResponse))
      let regHasProblems = dataResponse.find(o=>"error" in o)
      //console.log("register response: ",dataResponse)
      if(!regHasProblems){
        //console.log(`register response: ${response.data} `)
        setShowReg(false)
      } else {
        const usernameProblems = dataResponse.filter(o=>o.concerning==="username")
        const passwordProblems = dataResponse.filter(o=>o.concerning==="password")
        console.log(`reg had ${usernameProblems.length} problems with username and ${passwordProblems.length} with password`)
        setPasswordErrors(passwordProblems)
        setUsernameErrors(usernameProblems)
      }
    }
    //else{
      //console.log("passwords didnt match")
      //props.setNotifMessage({error:"The passwords did not match"})
   // }
  }

  const pressLogin = (event) => {
    event.preventDefault()
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
    <Form noValidate onSubmit={(event)=>pressLogin(event)}>
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
              isValid={username.length>0 && validated && !usernameErrors.length}
              isInvalid={usernameErrors.length}
            />
            <Form.Control.Feedback type="invalid">
              {usernameErrors.map(o=>o.error).join(", ")}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomPassword">
          <InputGroup hasValidation validated={validated}>
            <InputGroup.Prepend>
              <InputGroup.Text id="passwordInputGroupPrepend"><MdVpnKey/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleLoginFormPassChange}
              isValid={password.length && validated && !passwordErrors.length}
              isInvalid={passwordErrors.length}
            />
            <Form.Control.Feedback type="invalid">
              {passwordErrors.map(o=>o.error).join(", ")}
            </Form.Control.Feedback>
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
              isValid={password===regPassConfirm}
              isInvalid={password!==regPassConfirm}
            />
            <Form.Control.Feedback type="invalid">
            Passwords must match.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md={showReg?"1":"2"}>
          <Button variant={showReg?"outline-primary":"link"} type="submit" >{showReg?"Register":"Login/ Register"}</Button>
          <Form.Label style={{color:"red"}}>{loginProblems.length?loginProblems.map(o=>o.error).join(", "):""}</Form.Label>
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

export default LoginForm
