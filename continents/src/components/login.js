import React from 'react'

const LoginForm = (props) => {
    const p = {
        "border": "1px solid black",
        "border-radius": "3px"
      }

  const pressLogin = (event) => {
event.preventDefault()
    console.log("pressed login form button")
    props.login()
  }

const handleLoginFormUserChange = (event) => {
    console.log('about to submit user ',event.target.value)
    props.setLoginUser(event.target.value)
  }

const handleLoginFormPassChange = (event) => {
    console.log('about to submit pass ',event.target.value)
    props.setLoginPass(event.target.value)
  }

    return (
      <div>
        <form onSubmit={pressLogin}>
          <span>username:<input onChange={handleLoginFormUserChange}/></span>
          <span>password:<input type="password" onChange={handleLoginFormPassChange}/></span>
        <button type="submit">Login</button>
      </form>   
      </div>
    )
  }

  export default LoginForm
