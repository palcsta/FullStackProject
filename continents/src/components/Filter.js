import React from 'react'

const Filter = ({ value, change }) => {


  const center = {
    "text-align": "center"
  }

    return(


      <div style={center}>
        <input placeholder="Enter name of the country" value={value}

          onChange={change} />
      </div>
    )
}
export default Filter
