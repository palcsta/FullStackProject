
const Country = ({ country }) => {
    if (!country) {
      return null
    }
  
    if (!country.found) {
      return (
        <div>
          not found...
        </div>
      )
    }
    const p = {
        "border": "1px solid black",
        "border-radius": "3px"
      }
    return (
      <div>
        <h3>{country.data.name} </h3>
        <div><i>capital:</i> {country.data.capital} </div>
        <div><i>population:</i> {country.data.population}</div> 
        <img style={p}src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
      </div>
    )
  }

  export default  Country