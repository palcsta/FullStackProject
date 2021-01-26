import React, { useState } from 'react';

import Country from './Country';

//"display:inline"
const style = {
    display: 'inline',
    border: '3px solid black',
    borderradius: '20px',
    'font-size': '29px',

};
const TenCountries = ({ countries, one }) => {
    
    const [index, setIndex] = useState(999);
    
    const [shown, setShown] = useState("")

    
    
    const show = (i) => {
        console.log('clicked shown2')


        if (shown == "") { setShown(<Country country={countries[i]} />) }
        else if (index == i) { setShown("") }
        else setShown(<Country country={countries[i]} />)
        setIndex(i)
    }

   /* const darker = () => {
        console.log("darker method: ", details)
    }*/

    let whatToShow = one
        ? (<Country country={countries[0]} />)
        : <>{shown}{countries.map((x, i) =>
            <p style={style}><a key={x.name} onClick={() => show(i)}>
                {x.name}<img style={style} src={x.flag} alt={x.name}
                    width="35" height="24">
                </img>
            </a></p>)}</>
    //{details}
    return (

        <>
            { console.log("darker method: ", whatToShow)}
            {whatToShow}


        </>

    );
}

//about 250 countries
//23 subregions including empty string
//4 europes, 5 africas, 3 americas, 5 asias, 1 empty, 5 others
//no region in antarctica, bouvet island and heard island and mcdonald islands


const Countries = ({ countries, one, ten }) => {

    let whatToShow = <TenCountries countries={countries} one={one} />
    //  let unique = countries !== [] ? [...new Set(countries.map(x => x.subregion))] : undefined
    //  console.log(unique)
    //  let euro = countries.filter(x => x.subregion.includes("Europe"))
    //  let afri = countries.filter(x => x.subregion.includes("Africa"))
    //  let amer = countries.filter(x => x.subregion.includes("America"))
    // let asia = countries.filter(x => x.subregion.includes("Asia"))
    /* let all_other = countries.filter(x => !x.subregion.includes("Africa")
         && !x.subregion.includes("Europe")
         && !x.subregion.includes("Asia")
         && !x.subregion.includes("America"))*/
    //let other = [...new Set(all_other.map(x => x.subregion))]
    //console.log("other countries", other)
    // console.log(euro)
    // console.log(countries.length)

    return (

        <>
            {whatToShow}
        </>

    );
};


export default Countries;