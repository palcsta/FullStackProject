import React, { /*useState*/ } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

const Dropdwn = ({ data }) => {
    const continents = data.filter(x => x.region !== "Polar").map(x => x.region).filter(unique)

    const polar = data.filter(x => x.region === "Polar").map(x => x.name)
    const other = data.filter(x => x.region === "").map(x => x.name)
    //const polar = data.filter(x => x.region == "Americas")

    console.log('sub-continents in dropdown: ', polar)
    //console.log("data in dropdown: ", noContinent)
    return (<>
        <div align="center" split>
            <DropdownButton id="dropdown-basic-button" title="Countries/Continents" split>
                {continents.filter(x => x !== "").map(x => <>
                    <Dropdown >
                        <Button variant="info">{x}</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                        <Dropdown.Menu className="super-colors">

                            {data.filter(y => y.region.includes(x)).map(x => x.subregion)
                                .filter(unique).map(z =>
                                    <>
                                        <Dropdown >
                                            <Button variant="info">{"   " + z}</Button>
                                            <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                                            <Dropdown.Menu className="super-colors">
                                                {data.filter(a => a.subregion == z).map(b =>
                                                    <><Dropdown.Item >{b.name}</Dropdown.Item></>
                                                )}


                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown.Divider />
                                    </>)}




                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown.Divider />



                </>)}
                <DropdownButton variant="info" id="dropdown-basic-button" title="Polar">
                    {polar.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}

                </DropdownButton>
                <Dropdown.Divider />
                <DropdownButton variant="info" id="dropdown-basic-button" title="Other(no region)">
                    {other.map(x => <><Dropdown.Item href="#/action-1">{x}</Dropdown.Item></>)}

                </DropdownButton>
            </DropdownButton>



          {/*  <Dropdown split>
                <Dropdown.Toggle id="dropdown-custom-1">Countries</Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">

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
                        <Button onClick={() => alert(Date.now())} variant="info">dropdown with button</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1" >Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2" >Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                                Active Item sdfsdlfhskjdhfkj
      </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown split>
                                <Button variant="info">mix it up style-wise</Button>
                                <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                                <Dropdown.Menu className="super-colors">

                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" active>
                                        Active Item
      </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown >
                                <Button variant="info">mix it up style-wise</Button>
                                <Dropdown.Toggle split variant="info" id="dropdown-custom-2" />
                                <Dropdown.Menu className="super-colors">

                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" active>
                                        Active Item
      </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Menu>
                    </Dropdown>
                </Dropdown.Menu>
            </Dropdown>{' '}
          */}

        </div></>);
}

export default Dropdwn;