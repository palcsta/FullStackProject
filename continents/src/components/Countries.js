import Country from './Country';
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Filter from './Filter'
import axios from 'axios'
import Map from './map.js'
import { render } from '@testing-library/react';



const Countries = ({ countries }) => {
    // const [index, setIndex] = useState(10);
    const [shown, setShown] = useState("")
    const [fetched, setFetched] = useState([])
    const color = "black"
    const style = {
        display: 'inline',
        border: '4px solid ' + color,
        borderradius: '20px',
        'font-size': '29px',

    };
    let showed = countries.map(x => x.id.toUpperCase())
    /* console.log("countries in countreis, ", countries)
     console.log("fetched in countreis, ", fetched)
     console.log("showed in countreis, ", showed)
     console.log("MANIPULATIONS, ", fetched.filter(x => showed.includes(x.alpha2Code)).map(x => x.name))
 */
    const hook = () => {
        // console.log('effect countries')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setFetched(response.data)
                // console.log(countries)

            })
    }

    useEffect(hook, [])


    const remove = (props) => {
        // console.log("removing!!!", props.alpha2Code)
        // console.log("fetched in removing, ", fetched)
        //setFetched(showed.filter(x => x !== props.alpha2Code))
        //setShowed(countries.map(x => x.id.toUpperCase()))
        setShown("")
        if (document.querySelector('g') !== null) {

            if (document.getElementById(props.alpha2Code.toLowerCase()) !== null) {
                document.getElementById(props.alpha2Code.toLowerCase()).style.fill = "black" 
                
            }
        }
       
        //showed = countries.map(x => x.id.toUpperCase())
    }




    const list = () => {

        return (<>

            {fetched.filter(x => showed.includes(x.alpha2Code)).map((x, i) =>
                <p style={{
                    display: 'inline',
                    border: '4px solid ' + countries.filter(z => z.id.toUpperCase() == x.alpha2Code).map(y => y.color),
                    borderradius: '20px',
                    'font-size': '29px',

                }} ><a key={x.name} onClick={() => show(x)}>
                        {x.name}<img style={{
                            display: 'inline',
                            border: '4px solid ' + countries.filter(z => z.id.toUpperCase() == x.alpha2Code).map(y => y.color),
                            borderradius: '20px',
                            'font-size': '29px',

                        }} src={x.flag} alt={x.name}
                            width="35" height="24">
                        </img>
                    </a></p>)}
        </>

        )
    }


    const show = (i) => {
        if (shown == "") {
            setShown(<><Button variant="danger" onClick={() => remove(i)} >{"click to remove: " + i.name}</Button>
                <Button variant="success" onClick={() => setShown("")} >{"cancel"}</Button></>)
        }
        else if (shown !== "") { setShown("") }
        else setShown(<><Button variant="danger" onClick={() => remove(i)} >{"click to remove: " + i.name}</Button>
            <Button variant="success" onClick={() => setShown("")} >{"cancel"}</Button></>)
        //setIndex(i)
    }
    return (<>{/*<Map showing={countries} />*/}
        {/*title()*/}<p>{showed !== [] ? shown : ""}</p>



        {/*fetched !== []
            ? fetched.map(x => showed.includes(x.alpha2Code)).map(x => <p>{x.name}</p>)
        : ""*/}
       
        {list()}


    </>
    );
}


export default Countries

/*
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }



    function getColor() {
        const R = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
        const G = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
        const B = Math.round(Math.random() * 255).toString(16).padStart(2, '0')
        return `#${R}${G}${B}`
    }

    const paint = () => {
        let error = ""
        var i;


        if (document.querySelector('g') !== null && countries !== undefined && countries.length !== 0) {

            const color = getColor()
            const painted = []
            const region = []
            const subregion = []

            for (i = 0; i < countries.length; i++) {
                if (document.getElementById(countries[i].alpha2Code.toLowerCase()) !== null) {
                    painted.push(document.getElementById(countries[i].alpha2Code.toLowerCase()).style.fill)
                    region.push(countries[i].region)
                    subregion.push(countries[i].subregion)
                }
                if (true) {
                    for (i = 0; i < countries.length; i++) {

                        if (document.getElementById(countries[i].alpha2Code.toLowerCase()) !== null) {
                            document.getElementById(countries[i].alpha2Code.toLowerCase()).style.fill = color
                        }
                        if (document.getElementById(countries[i].alpha2Code.toLowerCase()) == null)
                            error += ", " + countries[i].name
                    }
                }

                console.log("Sorry! These countries are too small to be shown on this map: ", error)

            }
        }

    }
*/



/*const title = () => {
    if (countries.length == 1) {
        return (<p><Button onClick={() => paint()}>repaint: {countries[0].name} </Button></p>)
    }
    //console.log("countries.map(x => x.subregion).filter(unique) ",countries.map(x => x.subregion).filter(unique))
    if (countries.length > 1 && countries.map(x => x.subregion).filter(unique).length == 1) {
        return (<p><Button onClick={() => paint()}>repaint:{countries.map(x => x.subregion).filter(unique)[0]} </Button></p>)
    }
    if (countries.length > 1 && countries.map(x => x.subregion).filter(unique).length !== 1) {
        return (<p><Button onClick={() => paint()}>repaint:{countries.map(x => x.region).filter(unique)[0]} </Button></p>)
    } else {
        return (<></>)
    }





}*/


