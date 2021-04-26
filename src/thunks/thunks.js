import {covidAPI} from '../components/api/api'
import {contextActions} from '../context/context'

export const getAllCountries = async (dispatch) => {
  let data = await covidAPI.getAllCountries()

  dispatch(contextActions.setCountries(data.map(country => ({
    name: country.country,
    code: country.countryInfo.iso2
  }))))
}

export const getCountryInfo = async (dispatch, countryCode) => {
  let data = await covidAPI.getCountryInfo(countryCode)
  dispatch(contextActions.setCountryInfo(data))
}