import React from 'react'
import { useState } from 'react'
import '../styles/SelectedFlags.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
const SelectedFlags = (props) => {

  let countriesToShowFlagsFor = props.countries.filter(x => props.selected.includes(x.alpha2Code.toLowerCase()))
  const [show, setShow] = useState(countriesToShowFlagsFor)
  const getColor = (a2) => {
    let myColorObj = props.mapColor.find(z => z.id.toUpperCase() === a2)
    return myColorObj ? myColorObj.color : "red"
  }


  let list =
    countriesToShowFlagsFor
      .sort((a, b) => parseFloat(b.population) - parseFloat(a.population
      ))





  return (

    <div>



      { show !== undefined && countriesToShowFlagsFor.length !== 0 ? <div style={{ "textAlign": "right","margin":"0.2em" }}>
        <p style={{"display":"inline","margin":"0.2em 0.5em 0.2em 0.2em"}}>
        Sort by:
        </p>
      <ButtonGroup>
          <Button onClick={() => setShow(
            countriesToShowFlagsFor
              .sort((a, b) => parseFloat(b.population) - parseFloat(a.population)))}
            variant="secondary">Population</Button>
          <Button onClick={() => setShow(
            countriesToShowFlagsFor
              .sort((a, b) => parseFloat(b.area) - parseFloat(a.area)))} variant="secondary">Area</Button>
          <Button variant="secondary" onClick={() =>
            setShow(countriesToShowFlagsFor
              .sort(function (a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
              })
            )}>Name</Button>
        </ButtonGroup>
      </div> : ""}


      {show.length > 0 && show.length == countriesToShowFlagsFor.length ? show.map((x, i) =>
        <div key={x.name} className="selectedBox" style={{
          borderColor: getColor(x.alpha2Code)
        }} ><p onClick={() => (props.setShowDetail(x.alpha2Code.toLowerCase()), window.scrollTo({
          top: 95,
          behavior: 'smooth',
        }))}>
            {x.name}<img className="selectedFlag" src={x.flag} alt={x.name}></img>
          </p>
        </div>
      ) :
        list.map((x, i) =>
          <div key={x.name} className="selectedBox" style={{
            borderColor: getColor(x.alpha2Code)
          }} ><p onClick={() => (props.setShowDetail(x.alpha2Code.toLowerCase()), window.scrollTo({
            top: 95,
            behavior: 'smooth',
          }))}>
              {x.name}<img className="selectedFlag" src={x.flag} alt={x.name}></img>
            </p>
          </div>
        )}

    </div >

  )

}

export default SelectedFlags
