import React, {useContext, useMemo} from 'react'
import s from './Table.module.css'
import {StateContext} from '../../context/context'
import {sortByCases} from '../../utilities/helpers'

const Table = () => {
  const {tableData} = useContext(StateContext)

  const sortedData = useMemo(() => sortByCases(tableData), [tableData]);

  return (
    <>
      <h3>Live Cases by Country</h3>
      <div className={s.table}>
        {sortedData.map(({name, cases, todayCases}) =>
        <tr key={name + cases}>
          <td>{name}</td>
          <td>
            <div className={s.stats}>
              <strong>{cases}</strong>
              <small>+{todayCases}</small>
            </div>
          </td>
        </tr>)}
      </div>
    </>
  )
}

export default Table
