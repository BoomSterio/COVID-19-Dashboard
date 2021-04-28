import React, {useContext, useEffect, useState} from 'react'
import LineGraph from './LineGraph/LineGraph'
import {StateContext} from '../../context/context'
import {FormControl} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {covidAPI} from '../../api/api'
import Preloader from '../Preloader/Preloader'

const YEAR = 365
const SIX_MONTHS = 180
const THREE_MONTHS = 90
const MONTH = 30
const WEEK = 7

const Graphs = () => {
  const [range, setRange] = useState(SIX_MONTHS)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const {country} = useContext(StateContext)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      setIsLoading(true)
      covidAPI.getCountryHistories(country, range)
        .then(data => {
          if(mounted) {
            setData(() => data)
            setIsLoading(false)
          }
        })
    }
    fetchData();

    return () => {
      mounted = false
    }
  }, [country, range])

  return (
    <>
      <h3 style={{margin: '12px 0'}}>Historical Statistics</h3>
      <div style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
        <strong>Last</strong>
        <FormControl size={'small'}>
          <Select value={range} onChange={e => setRange(() => e.target.value)}>
            <MenuItem value={YEAR}>Year</MenuItem>
            <MenuItem value={SIX_MONTHS}>Six Month</MenuItem>
            <MenuItem value={THREE_MONTHS}>Three Months</MenuItem>
            <MenuItem value={MONTH}>Month</MenuItem>
            <MenuItem value={WEEK}>Week</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!isLoading ?
        <>
          <LineGraph label={`Cases (${country})`} data={data}/>
          <LineGraph label={`Recovered (${country})`} casesType={'recovered'} data={data}/>
          <LineGraph label={`Deaths (${country})`} casesType={'deaths'} data={data}/>
        </>
        :
        <Preloader/>
      }

    </>
  )
}

export default Graphs
