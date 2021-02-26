import React, { useState } from 'react';
import Country from './Country';
import Filter from './Filter';
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
    const [searched, setNewSearched] = useState('')
    

    const [filteredCountries, setFilteredCountries] = useState(countries)

    const [showTen, setShowTen] = useState(true)
    const [showOne, setShowOne] = useState(false)


    const handleNewSearched = (event) => {
        console.log("event ", event)

        let filtered = countries.filter(
            x =>
                x.name.toUpperCase().includes(
                    event.target.value.toUpperCase()))
        event.preventDefault()
        setNewSearched(event.target.value)
        setFilteredCountries(filtered)
        setShowTen(filtered.length < 1000)
        setShowOne(filtered.length === 1 && filtered !== [])
    }




    const show = (i) => {
        if (shown == "") { setShown(<Country country={countries[i]} />) }
        else if (index == i) { setShown("") }
        else setShown(<Country country={countries[i]} />)
        setIndex(i)
    }


    let whatToShow = showOne
        ? (<Country country={countries[0]} />)
        : <>{shown}<Map showing={countries}/>{countries.map((x, i) =>
            <p style={style}><a key={x.name} onClick={() => show(i)}>
                {x.name}<img style={style} src={x.flag} alt={x.name}
                    width="35" height="24">
                </img>
            </a></p>)}</>
    //{details}
    return (<>
        
        {whatToShow}
    </>
    );
}


export default Countries



//about 250 countries
//23 subregions including empty string
//4 europes, 5 africas, 3 americas, 5 asias, 1 empty, 5 others
//no region in antarctica, bouvet island and heard island and mcdonald islands