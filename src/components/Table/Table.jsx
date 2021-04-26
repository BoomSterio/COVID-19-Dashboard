import React from 'react'

const Table = ({countries}) => {
  return (
    <div>
      {countries.map(({name, cases}) =>
      <tr>
        <td>{name}</td>
        <td><strong>{cases}</strong></td>
      </tr>)}
    </div>
  )
}

export default Table
