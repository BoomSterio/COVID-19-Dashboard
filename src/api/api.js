import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19/'
})

export const covidAPI = {
  getAllCountries: () => {
    return instance
      .get('countries')
      .then(res => res.data)
      .catch(err => console.log(err))
  },
  getCountryInfo: (countryCode) => {
    const url = countryCode === 'worldwide' ? 'all' : `countries/${countryCode}`

    return instance
      .get(url)
      .then(res => res.data)
      .catch(err => console.log(err))
  },
  getCountryHistories: (countryCode = 'worldwide', lastDays) => {
    const url = countryCode === 'worldwide' ? 'historical/all' : `historical/${countryCode}`

    return instance
      .get(url + `?lastdays=${lastDays}`)
      .then(res => countryCode === 'worldwide' ? res.data : res.data.timeline)
      .catch(err => console.log(err))
  },
}