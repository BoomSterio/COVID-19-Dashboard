import React, {useContext} from 'react'
import s from './Statistics.module.css'
import InfoBox from './InfoBox/InfoBox'
import {StateContext} from '../../context/context'

const Statistics = () => {
  const {countryInfo} = useContext(StateContext)

  return (
    <div className={s.statistics}>
      <InfoBox type={'cases'} title={'COVID-19 Cases'} cases={countryInfo.todayCases} total={countryInfo.cases?.toLocaleString('en')}/>
      <InfoBox type={'recovered'} title={'Recovered'} cases={countryInfo.todayRecovered} total={countryInfo.recovered?.toLocaleString('en')}/>
      <InfoBox type={'deaths'} title={'Deaths'} cases={countryInfo.todayDeaths} total={countryInfo.deaths?.toLocaleString('en')}/>
    </div>
  )
}

export default Statistics
