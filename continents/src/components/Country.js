
const Country = ({ country }) => {

  if (country.length > 1) {
    return (
      <div>
       
      </div>
    )
  }
  if (country.length <1) {
    return (
      <div>
       
      </div>
    )
  }

  const p = {
    "border": "1px solid black",
    "border-radius": "3px"
  }
  return (
    
      <div>
        <h3>{country[0].name} </h3>
        <div><i>capital:</i> {country[0].capital} </div>
        <div><i>population:</i> {country[0].population}</div>
        <img style={p} src={country[0].flag} height='100' alt={`flag of ${country[0].name}`} />
      </div> 
    )
}

export default Country