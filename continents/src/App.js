import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Footer from './components/Footer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      axios.get(url).then(response => {
        console.log("fetched countries: ", response.data)
        if (response.data.length > 0) {
          setCountry({
            found: true,
            data: response.data[0]
          })
        }

      }).catch(error => {
        setCountry({ found: false })
      })
    }

  }, [name])

  return country
}
const p = {
  "border": "2px solid cyan",
  "border-radius": "5px"
}
const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <>
      <div class="container" style={p}>

      <Form onSubmit={fetch}>
        <Form.Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Control placeholder="enter countrys code(eg. US)"{...nameInput} />
          </Form.Group>
          <Form.Group >
            <Button variant="primary" type="submit" >
              Find
      </Button>
          </Form.Group>
        </Form.Row>
      </Form>

      <Country country={country} />
      
    </div><div class="container" style={p}><Footer/></div>
  </>)
}

export default App