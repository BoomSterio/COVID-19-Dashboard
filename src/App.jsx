import './App.css'
import React, {useContext, useEffect, useState} from 'react'
import Header from './components/Header/Header'
import Statistics from './components/Statistics/Statistics'
import Card from '@material-ui/core/Card'
import {CardContent} from '@material-ui/core'
import {DispatchContext, Provider, StateContext} from './context/context'
import {getCountryInfo} from './thunks/thunks'
import Preloader from './components/Preloader/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const {country, countryInfo, tableData} = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    const getCountryData = async () => {
      setIsLoading(true)

      await getCountryInfo(dispatch, country)

      setIsLoading(false)
    }

    getCountryData()
  }, [country])

  if(isLoading) return <Preloader/>

  return (
    <div className="app">
      <div className="content-wrapper">
        <div className="app__left">
          <Header/>
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

class AppWrap extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    return (
      <Provider className={'app'}>
        <App/>
      </Provider>
    )
  }
}

export default AppWrap;
