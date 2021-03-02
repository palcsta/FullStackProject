import React, { useState } from 'react';
import Country from './Country';
import Button from 'react-bootstrap/Button'
import Map from './map.js'

const style = {
    display: 'inline',
    border: '3px solid black',
    borderradius: '20px',
    'font-size': '29px',

};
const Countries = ({ countries }) => {
    const [index, setIndex] = useState(10);
    const [shown, setShown] = useState("")



    const show = (i) => {
        if (shown == "") { setShown(<Country country={countries[i]} />) }
        else if (index == i) { setShown("") }
        else setShown(<Country country={countries[i]} />)
        setIndex(i)
    }


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




    const title = () => {
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





    }

    return (<><Map showing={countries} />
        {title()}
        {countries.map((x, i) =>
            <p style={style}><a key={x.name} onClick={() => show(i)}>
                {x.name}<img style={style} src={x.flag} alt={x.name}
                    width="35" height="24">
                </img>
            </a></p>)}{shown}</>
    );
}


export default Countries
