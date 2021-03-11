import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { MdSave } from 'react-icons/md'
import { IconContext } from 'react-icons'
import '../styles/SaveBloc.css'
import { saveBlocService } from '../services/blocService'

const SaveBlocForm = (props) => {

    const [blocName, setBlocName] = useState('')
    const [showSaveBlocForm, setShowSaveBlocForm] = useState(false)

    const handleBlocNameChange = (event) => {
        event.preventDefault()
        setBlocName(event.target.value)
    }

    const pressSave = (event) => {
        event.preventDefault()
        const blocObject = {name:blocName,countries:props.selected}
        const token = `bearer ${props.user.token}`
            saveBlocService(blocObject,token).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const pressCancel = () => {
        console.log("pressed cancel, showSaveBlocForm was ",showSaveBlocForm)
        setShowSaveBlocForm(false)
        console.log("pressed cancel, showSaveBlocForm is now ",showSaveBlocForm)
        setBlocName('')
    }

    return (
        <>
            {!showSaveBlocForm||!props.user?<Button disabled={!props.user} onClick={()=>setShowSaveBlocForm(true)}>New Bloc</Button>: 
            <form onSubmit={pressSave}>
                <div>
                    <label for="bloc-name">Name</label>
                    <input type="text" id="bloc-name" placeholder="Enter bloc name" onChange={handleBlocNameChange} />
                </div>

                <IconContext.Provider value={{ size: "1.25em", className: "saveButtonIcon" }}>
                    <Button variant="primary" type="submit"><MdSave/> Save</Button>
                    <Button variant="secondary" onClick={()=>pressCancel()}>Cancel</Button>
                </IconContext.Provider>
            </form>
                }
        </>
    )

}


export default SaveBlocForm
