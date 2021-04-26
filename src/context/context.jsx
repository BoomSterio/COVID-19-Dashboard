import React, {useEffect, useReducer} from 'react'
import {getAllCountries} from '../thunks/thunks'

export const StateContext = React.createContext()
export const DispatchContext = React.createContext()

let initialState = {
  country: 'worldwide',
  countryInfo: {},
  countries: [],
  tableData: [],
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
    /*case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }*/
    default:
      return state
  }
}

export const contextActions = {
  setCountry: country => ({type: 'SET_COUNTRY', country}),
  setCountryInfo: countryInfo => ({type: 'SET_COUNTRY_INFO', countryInfo}),
  setCountries: countries => ({type: 'SET_COUNTRIES', countries}),
  setTableData: tableData => ({type: 'SET_TABLE_DATA', tableData}),
  //setIsLoading: isLoading => ({type: 'SET_IS_LOADING', isLoading}),
}

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllCountries(dispatch)
  }, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}