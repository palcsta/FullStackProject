import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { MdSave } from 'react-icons/md'
import { IconContext } from 'react-icons'
import '../styles/SaveBloc.css'
import { saveBlocService } from '../services/blocService'

const SaveBlocForm = (props) => {

    const [blocName, setBlocName] = useState('')
    const [showSaveBlocForm, setShowSaveBlocForm] = useState(false)
    const [blocSaveProblem, setBlocSaveProblem] = useState("")
    const [blocSaved, setBlocSaved] = useState(false)

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
            let blocSavingProblem = "error" in response
            if(blocSavingProblem){
                setBlocSaveProblem(response.error)
            } else if("info" in response){
                //probably ok
                setBlocSaveProblem("")
                setBlocSaved(true)
                setShowSaveBlocForm(false)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }

    const pressCancel = () => {
        setShowSaveBlocForm(false)
        setBlocName('')
    }

    const firstPress = () => {
        setShowSaveBlocForm(true)
        setBlocSaved(false)
    }

    return (
        <>
            {
                !showSaveBlocForm||!props.user?<><Button disabled={!props.user} onClick={()=>firstPress()}>New Bloc</Button> 
                    <p style={{color:"blue",display:blocSaved?"inline":"none"}}>Bloc Saved</p></>: 
                    <form onSubmit={pressSave}>
                        <div>
                            <label for="bloc-name">Name</label>
                            <input type="text" id="bloc-name" placeholder="Enter bloc name" onChange={handleBlocNameChange} />
                            <p style={{color:"red",display:blocSaveProblem.length?"inline":"none"}}>{blocSaveProblem}</p>
                        </div>

                        <IconContext.Provider value={{ size: "1.25em", className: "saveButtonIcon" }}>
                            <Button variant="primary" type="submit"><MdSave/> Save</Button>
                            <Button variant="secondary" onClick={()=>{pressCancel();setBlocSaveProblem("")}}>Cancel</Button>
                        </IconContext.Provider>
                    </form>
            }
        </>
    )

}


export default SaveBlocForm
