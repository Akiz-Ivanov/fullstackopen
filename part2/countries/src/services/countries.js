import axios from "axios"

const getCountries = () => {
    const request = axios.get('https://restcountries.com/v3.1/all')
    return request.then(response => response.data)
}

const getWeather = capital => {

    const city = Array.isArray(capital) ? capital[0] : capital;

    const api_key = import.meta.env.VITE_OWM_KEY
    const request = axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            units: 'metric',
            appid: api_key
        }
    })

    return request.then(response => response.data)
}

export default { getCountries, getWeather }