const API_LINK = 'https://studies.cs.helsinki.fi/restcountries/api'
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_ALL = "/all"
const SPECIFIC_QUERY = '/name/' // name of the country needs to be attached 


// const API_KEY = import.meta.env.VITE_WEATHER_API

const VITE_API_KEY = '367516bd5ff599d7856d35af5844ef9f'


import axios from 'axios'

export const getAllCountries = () => {
    let url = API_LINK+API_ALL
    console.log(`making request to ${url}`)
    return axios.get(url)
}


export const getWeather = (city) => {
    let url = `${WEATHER_API}${city}&appid=${VITE_API_KEY}&units=metric`;
    return axios.get(url)
}



