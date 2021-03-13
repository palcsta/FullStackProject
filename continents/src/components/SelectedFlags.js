import React from 'react'

const SelectedFlags = (props) => {

  //props.mapColor.find(z => z.id.toUpperCase() === x.alpha2Code).color

  let countriesToShowFlagsFor = props.countries.filter(x => props.selected.includes(x.alpha2Code.toLowerCase()))

  const getColor = (a2) => {
    let myColorObj = props.mapColor.find(z => z.id.toUpperCase() === a2)
    return myColorObj ? myColorObj.color : "red"
  }
  
  


  return (

    <>
      {countriesToShowFlagsFor.map((x, i) =>
        <p key={x.name} style={{
          display: 'inline',
          border: `4px solid ${getColor(x.alpha2Code)}`,
          borderradius: '20px',
          'fontSize': '29px',          
          display: "inline-block"
          
        }} ><a onClick={() => props.setShowDetail(x.alpha2Code.toLowerCase())}>
            {x.name}<img style={{
              display: 'inline',
             borderradius: '20px',
             'fontSize': '29px',
              
            }} src={x.flag} alt={x.name}
              width="35" height="24">
            </img>
          </a></p>
      )}
    </>

  )

}

export default SelectedFlags
