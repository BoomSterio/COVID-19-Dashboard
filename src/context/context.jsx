import React, {useEffect, useReducer} from 'react'
import {getAllCountries, getCountryInfo} from '../thunks/thunks'

export const StateContext = React.createContext()
export const DispatchContext = React.createContext()

let initialState = {
  country: 'worldwide',
  countryInfo: {},
  countries: [],
  tableData: [],
  mapCenter: [34.80746, -40.4746],
  mapZoom: 3,
  mapCountries: [],
  mapCasesType: 'cases',
  isLoading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNTRY': {
      return {
        ...state,
        country: action.country
      }
    }
    case 'SET_COUNTRY_INFO': {
      return {
        ...state,
        countryInfo: action.countryInfo
      }
    }
    case 'SET_COUNTRIES': {
      return {
        ...state,
        countries: action.countries
      }
    }
    case 'SET_TABLE_DATA': {
      return {
        ...state,
        tableData: action.tableData
      }
    }
    case 'SET_MAP_CENTER': {
      return {
        ...state,
        mapCenter: action.mapCenter
      }
    }
    case 'SET_MAP_ZOOM': {
      return {
        ...state,
        mapZoom: action.mapZoom
      }
    }
    case 'SET_MAP_COUNTRIES': {
      return {
        ...state,
        mapCountries: action.mapCountries
      }
    }
    case 'SET_MAP_CASES_TYPE': {
      return {
        ...state,
        mapCasesType: action.mapCasesType
      }
    }
    case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    default:
      return state
  }
}

export const contextActions = {
  setCountry: country => ({type: 'SET_COUNTRY', country}),
  setCountryInfo: countryInfo => ({type: 'SET_COUNTRY_INFO', countryInfo}),
  setCountries: countries => ({type: 'SET_COUNTRIES', countries}),
  setTableData: tableData => ({type: 'SET_TABLE_DATA', tableData}),
  setMapCenter: mapCenter => ({type: 'SET_MAP_CENTER', mapCenter}),
  setMapZoom: mapZoom => ({type: 'SET_MAP_ZOOM', mapZoom}),
  setMapCountries: mapCountries => ({type: 'SET_MAP_COUNTRIES', mapCountries}),
  setMapCasesType: mapCasesType => ({type: 'SET_MAP_CASES_TYPE', mapCasesType}),
  setIsLoading: isLoading => ({type: 'SET_IS_LOADING', isLoading}),
}

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllCountries(dispatch)
  }, [])

  useEffect(() => {
    const getCountryData = () => {
      getCountryInfo(dispatch, state.country)
    }

    getCountryData()
  }, [state.country, dispatch])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}