import React from 'react'

const Filter = ({ value, change }) => (
  <div>
    <input placeholder="Enter name of the country" value={value}

      onChange={change} />
  </div>
)

export default Filter
