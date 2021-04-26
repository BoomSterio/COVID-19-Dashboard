import React from 'react'
import s from './Statistics.module.css'
import InfoBox from '../InfoBox/InfoBox'

const Statistics = ({info}) => {
  return (
    <div className={s.statistics}>
      <InfoBox title={'COVID-19 Cases'} cases={info.todayCases} total={info.cases?.toLocaleString()}/>
      <InfoBox title={'Recovered'} cases={info.todayRecovered} total={info.recovered?.toLocaleString()}/>
      <InfoBox title={'Deaths'} cases={info.todayDeaths} total={info.deaths?.toLocaleString()}/>
    </div>
  )
}

export default Statistics
