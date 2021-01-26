import React from 'react'

const Filter = ({ value, change }) => (
  <div>
    <input placeholder="find countries" value={value}
      onChange={change} />
  </div>
)


export default Filter
