import React from 'react'

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
        <span>username:<input onChange={handleLoginFormUserChange}/></span>
        <span>password:<input type="password" onChange={handleLoginFormPassChange}/></span>
        <span style={{display:props.showReg?"inline":"none"}}>password again:<input type="password" onChange={handleRegPassConfirmChange}/></span>
        <button type="submit">{props.showReg?"Register":"Submit"}</button>
      </form>   
    </div>
  )
}

export default LoginForm
