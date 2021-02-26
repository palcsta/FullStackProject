import React, { useState } from 'react';
import Country from './Country';

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


    return (<>{shown}<Map showing={countries} />{countries.map((x, i) =>
        <p style={style}><a key={x.name} onClick={() => show(i)}>
            {x.name}<img style={style} src={x.flag} alt={x.name}
                width="35" height="24">
            </img>
        </a></p>)}</>
    );
}


export default Countries
