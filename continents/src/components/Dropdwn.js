import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import show from './Countries'
import Countries from './Countries'
//import Country from './Country'




const unique = (value, index, self) => {
    return self.indexOf(value) === index
}





const Dropdwn = ({ data }) => {
    const [filtered, setFiltered] = useState(data)
    const [one, setOne] = useState(false)



    const continents = data.filter(x => x.region !== "Polar").map(x => x.region).filter(unique)

    const polar = data.filter(x => x.region === "Polar").map(x => x.name)
    const other = data.filter(x => x.region === "").map(x => x.name)
    //const polar = data.filter(x => x.region == "Americas")

    console.log('sub-continents in dropdown: ', polar)
    //console.log("data in dropdown: ", noContinent)
    return (<>
        <div align="center" split>
            <DropdownButton id="dropdown-basic-button" title="Browse" split>
                {continents.filter(x => x !== "").map(x => <>
                    <Dropdown >
                        <Button onClick={() => setFiltered(
                            data.filter(r => r.region === x)

                        )} variant="info">{x}</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                        <Dropdown.Menu className="super-colors">

                            {data.filter(y => y.region.includes(x)).map(x => x.subregion)
                                .filter(unique).map(z =>
                                    <>
                                        <Dropdown >
                                            <Button

                                                onClick={() => setFiltered(
                                                    data.filter(g => g.subregion === z)

                                                )

                                                }


                                                variant="info">{"   " + z}</Button>
                                            <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
                                            <Dropdown.Menu className="super-colors">
                                                {data.filter(a => a.subregion == z).map(b =>
                                                    <><Dropdown.Item

                                                        onClick={() => setFiltered(
                                                            data.filter(q => q.name === b.name)

                                                        )}


                                                    >{b.name}</Dropdown.Item></>
                                                )}


                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown.Divider />
                                    </>)}




                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown.Divider />



                </>)}

                <Dropdown.Divider />
                <DropdownButton variant="info" id="dropdown-basic-button" title="Other">
                    {other.map(x => <><Dropdown.Item onClick={() => setFiltered(
                        data.filter(q => q.name === x)
                    )
                    }>{x}</Dropdown.Item></>)}
                    {polar.map(x => <><Dropdown.Item onClick={() => setFiltered(
                        data.filter(q => q.name === x)
                    )
                    }>{x + "(Polar)"}</Dropdown.Item></>)}
                </DropdownButton>
            </DropdownButton>




            <Countries countries={filtered}
                one={one}
            />



        </div></>);
}

export default Dropdwn;