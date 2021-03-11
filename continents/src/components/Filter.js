
import { render } from '@testing-library/react';
import React, { useState } from 'react';

const Filter = (props) => {

  const [searchBoxContent, setSearchBoxContent] = useState("")
  const [searchHints,setSearchHints] = useState("")
 
  const handleNewSearchBoxContent = (event) => {
    // console.log("event ", event)

    let filtered = props.countries.filter(
      x =>
        x.name.toUpperCase().includes(
          event.target.value.toUpperCase()))
    event.preventDefault()
    setSearchBoxContent(event.target.value)
    //console.log("FILTERED: ", filtered)
    if (filtered) {
      //console.log("filtered", filtered.length)
      if (filtered.length === 1) {
        //console.log("searchbox wants to show details for ", filtered[0].alpha2Code.toLowerCase())
        props.setShowDetail(filtered[0].alpha2Code.toLowerCase())
      }
      if (filtered.length < 21 && filtered.length !== 1) {
        setSearchHints(filtered.map(x => x.name).join(", "))
      } else {
        setSearchHints("")
      }
    }
    !event.target.value && props.setShowDetail(null)
  }

  return (
    <>
      <div style={{ "textAlign": "center" }}>
        <input placeholder="Search for a country" value={searchBoxContent}
          onChange={handleNewSearchBoxContent} />
        {searchHints && <span>Did you mean: </span>}{searchHints}
      </div>
    </>
  )
}
export default Filter
