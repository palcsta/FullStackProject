import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
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
            <DropdownButton id="dropdown-basic-button" title="Countries">
                {continents.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
        </DropdownButton>



        <Dropdown >
            <Dropdown.Toggle id="dropdown-custom-1">Pow! Zoom!</Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <DropdownButton id="dropdown-basic-button" title="Countries">
                    {continents.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <DropdownButton id="dropdown-basic-button" title="Countries">
                        {continents.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </DropdownButton>
                <Dropdown.Divider />
                <Dropdown >
                    <Button variant="info">mix it up style-wise</Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Active Item
      </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Menu>
        </Dropdown>{' '}


    </>);
}

export default Dropdwn;