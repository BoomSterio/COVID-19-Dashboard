import React, {useEffect, useState} from 'react'
import s from './Header.module.css'
import {FormControl} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'

const Header = ({country, changeCountry}) => {
  //todo: create DAL for API requests
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getCountriesData = async () =>  {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries')

      setCountries(response.data.map(country => ({
        name: country.country,
        code: country.countryInfo.iso2
      })))
    }

    getCountriesData()
  }, [])

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
