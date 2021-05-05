import React, {useContext} from 'react'
import s from './Map.module.css'
import {MapContainer, TileLayer} from 'react-leaflet'
import Card from '@material-ui/core/Card'
import {StateContext} from '../../context/context'
import DataOnMap from './DataOnMap/DataOnMap'

const Map = () => {
  const {mapCenter, mapZoom, mapCountries} = useContext(StateContext)

  return (
    <Card elevation={5} className={s.map}>
      <MapContainer minZoom={2} style={{ width: '100%', height: '100%' }} center={mapCenter} zoom={mapZoom}>
        <TileLayer
          url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <DataOnMap data={mapCountries}/>
      </MapContainer>
    </Card>
  )
}

export default Map
