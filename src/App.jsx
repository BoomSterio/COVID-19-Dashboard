import './App.css'
import React, {useContext} from 'react'
import Header from './components/Header/Header'
import Statistics from './components/Statistics/Statistics'
import Card from '@material-ui/core/Card'
import {CardContent} from '@material-ui/core'
import {Provider, StateContext} from './context/context'
import Preloader from './components/Preloader/Preloader'
import Table from './components/Table/Table'
import Graphs from './components/Graphs/Graphs'
import 'leaflet/dist/leaflet.css'
import Map from './components/Map/Map'

function App() {
  const {isLoading} = useContext(StateContext)

  if(isLoading) return <Preloader/>

  return (
    <div className="app">
      <div className="content-wrapper">
        <div className="app__left">
          <Header/>
          <Statistics/>
          <Map/>
        </div>
        <Card className="app__right">
          <CardContent>
            <Table/>
            <Graphs/>
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
