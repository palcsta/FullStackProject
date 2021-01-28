import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
let continents = [
    "Europe",
    "Asia",
    "Africa",
    "America",
    "Other",

  ]

const Dropdwn = () => {
    return (<>

        <DropdownButton id="dropdown-basic-button" title="Countries">
            {continents.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>


    </>);
}

export default Dropdwn;