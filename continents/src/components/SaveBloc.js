import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { MdSave } from 'react-icons/md'
import { IconContext } from 'react-icons'
import axios from 'axios'
import '../styles/SaveBloc.css'

const SaveBlocForm = (props) => {

    //props: apiPort, props.setNotifMessage, showSaveBlocForm

    const apiPort = props.apiPort?props.apiPort:"3003"

    const [blocName, setBlocName] = useState('')

    const handleBlocNameChange = (event) => {
        setBlocName(event.target.value)
    }

    const pressSave = (event) => {
        event.preventDefault()
        console.log("countries to save in bloc:", props.countriesToSave)
        const blocObject = {name:blocName,countries:props.countriesToSave}
        const token = "bearer "+JSON.parse(window.localStorage.getItem('loggedContinentsUser')).token
        const url = "api/blocs"
        axios.post(url,blocObject,{ headers: { Authorization: token }, baseURL: `${window.location.protocol}//${window.location.hostname}:${apiPort}`}).then(response => {
            console.log(response.data)
            //setTimeout(() => {
            // props.setNotifMessage(null)
            // }, 5000)
        }).catch(error => {
            console.log(error.response.data)
            //setTimeout(() => {
            //props.setNotifMessage(null)
            //}, 5000)
        })
    }

    const pressCancel = (event) => {
        event.preventDefault()
        props.setShowSaveBlocForm(false)
        setBlocName('')
    }

    return (
        <>
            <form onSubmit={pressSave}>
                <div>
                    <label for="bloc-name">Name</label>
                    <input type="text" id="bloc-name" placeholder="Enter bloc name" onChange={handleBlocNameChange} />
                </div>

                <IconContext.Provider value={{ size: "1.25em", className: "saveButtonIcon" }}>
                    <Button variant="primary" type="submit"><MdSave/> Save</Button>
                </IconContext.Provider>
            </form>
        </>
    )

}


export default SaveBlocForm
