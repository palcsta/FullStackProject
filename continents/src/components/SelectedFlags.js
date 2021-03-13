import React from 'react'
import '../styles/SelectedFlags.css'

const SelectedFlags = (props) => {

  //props.mapColor.find(z => z.id.toUpperCase() === x.alpha2Code).color

  let countriesToShowFlagsFor = props.countries.filter(x => props.selected.includes(x.alpha2Code.toLowerCase()))

  const getColor = (a2) => {
    let myColorObj = props.mapColor.find(z => z.id.toUpperCase() === a2)
    return myColorObj ? myColorObj.color : "red"
  }
  
  


  return (

    <div>
      {countriesToShowFlagsFor.map((x, i) =>
        <div key={x.name} className="selectedBox" style={{
          borderColor: getColor(x.alpha2Code)
        }} ><p onClick={() => props.setShowDetail(x.alpha2Code.toLowerCase())}>
            {x.name}<img className="selectedFlag" src={x.flag} alt={x.name}></img>
          </p>
        </div>
      )}
    </div>

  )

}

export default SelectedFlags
