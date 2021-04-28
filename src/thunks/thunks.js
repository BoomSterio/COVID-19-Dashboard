import {covidAPI} from '../api/api'
import {contextActions} from '../context/context'

export const getAllCountries = async (dispatch) => {
  let data = await covidAPI.getAllCountries()

  dispatch(contextActions.setCountries(data.map(country => ({
    name: country.country,
    code: country.countryInfo.iso2
  }))))
  dispatch(contextActions.setTableData(data.map(country => ({
    name: country.country,
    cases: country.cases,
    todayCases: country.todayCases
  }))))
  dispatch(contextActions.setMapCountries(data))
}

export const getCountryInfo = async (dispatch, countryCode) => {
  dispatch(contextActions.setIsLoading(true))

  let data = await covidAPI.getCountryInfo(countryCode)
  dispatch(contextActions.setCountryInfo(data))
  dispatch(contextActions.setMapCenter(countryCode === 'worldwide' ? [34.80746, -40.4746] : [data.countryInfo.lat, data.countryInfo.long]))
  dispatch(contextActions.setMapZoom(countryCode === 'worldwide' ? 3 : 4))

  dispatch(contextActions.setIsLoading(false))
}