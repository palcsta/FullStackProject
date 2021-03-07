import React, { useState } from 'react'
import axios from 'axios'

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
                    <label for="bloc-name">Bloc Name</label>
                    <input type="text" id="bloc-name" placeholder="Enter bloc name" onChange={handleBlocNameChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </>
    )

}


export default SaveBlocForm
