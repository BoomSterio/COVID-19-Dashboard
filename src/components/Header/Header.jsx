import React, {useContext} from 'react'
import s from './Header.module.css'
import {FormControl} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {contextActions, DispatchContext, StateContext} from '../../context/context'

const Header = () => {
  //todo: create DAL for API requests
  const {country, countries} = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const changeCountry = e => dispatch(contextActions.setCountry(e.target.value))

  return (
    <header className={s.header}>
      <h2>COVID-19 Dashboard</h2>
      <FormControl size={'small'}>
        <Select className={s.select} value={country} onChange={changeCountry} >
          <MenuItem value={'worldwide'}>Worldwide</MenuItem>
          {countries.map((country, i) =>
            <MenuItem key={i + country.code} value={country.code}>{country.name}</MenuItem> )}
        </Select>
      </FormControl>
    </header>
  )
}

export default Header
