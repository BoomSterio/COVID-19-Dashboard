import {Circle, Popup} from 'react-leaflet'
import numeral from 'numeral'
import React, {useContext, useMemo} from 'react'
import s from './DataOnMap.module.css'
import {StateContext} from '../../../context/context'

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },

  recovered: {
    hex: "#09b300",
    multiplier: 1200,
  },

  deaths: {
    hex: "#303030",
    multiplier: 2800,
  },
};

const DataOnMap = ({data}) => {
  const {mapCasesType} = useContext(StateContext)

  const circles = useMemo(() => data.map(country => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[mapCasesType].hex,
        fillColor: casesTypeColors[mapCasesType].hex,
      }}
      fillOpacity={0.4}
      radius={(Math.sqrt(country[mapCasesType]) / 9) * casesTypeColors[mapCasesType].multiplier}
    >
      <Popup>
        <img className={s.flag} src={country.countryInfo.flag} alt={'flag'}/>
        <h4>{country.country}</h4>
        <div>Cases: {numeral(country.cases).format('0,0')}</div>
        <div>Recovered: {numeral(country.recovered).format('0,0')}</div>
        <div>Deaths: {numeral(country.deaths).format('0,0')}</div>
      </Popup>
    </Circle>
  )), [data, mapCasesType])

  return (
    <>
      {circles}
    </>
  )
}

export default DataOnMap