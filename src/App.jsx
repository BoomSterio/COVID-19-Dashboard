import './App.css'
import React, {useEffect, useState} from 'react'
import Header from './components/Header/Header'
import Statistics from './components/Statistics/Statistics'
import Card from '@material-ui/core/Card'
import {CardContent} from '@material-ui/core'
import axios from 'axios'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})

  useEffect(() => {
    const getCountryData = async () => {
      setIsLoading(true)
      const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${country}`
      const response = await axios.get(url)

      setCountryInfo(response.data)
      setIsLoading(false)
    }

    getCountryData()
  }, [country])

  const changeCountry = e => setCountry(e.target.value)

  if(isLoading) return <h1>Loading...</h1>

  return (
    <div className="app">
      <div className="content-wrapper">
        <div className="app__left">
          <Header country={country} changeCountry={changeCountry}/>
          <Statistics info={countryInfo}/>
          <h1>MAP MAP MAP</h1>
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country (Table)</h3>
            <h3>Worldwide new casesType (Graph)</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
