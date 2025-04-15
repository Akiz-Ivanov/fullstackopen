import { useState, useEffect, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import countries from './services/countries'
import CountryList from './CountryList'
import CountryInfo from './CountryInfo'
import Search from './Search'

function App() {
  const countryInfoRef = useRef(null);

  //State variables
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesLoading, setCountriesLoading] = useState(true)
  const [weatherLoading, setWeatherLoading] = useState(false)

  //Derived variables
  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))

  //Fetch all countries on mount
  useEffect(() => {
    countries.getCountries()
      .then(data => {
        setAllCountries(data)
      })
      .catch(error => console.error('Error fetching countries:', error))
      .finally(() => setCountriesLoading(false))
  }, [])

  //Fetch weather for selected country
  useEffect(() => {
    if (selectedCountry && !selectedCountry.weather) {
      setWeatherLoading(true)
      countries.getWeather(selectedCountry.capital)
        .then(data => {
          setSelectedCountry(prevCountry => ({
            ...prevCountry,
            weather: data
          }))
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
        })
        .finally(() => setWeatherLoading(false))
    }
  }, [selectedCountry])

  //Focus on selected country
  useEffect(() => {
    if (selectedCountry && countryInfoRef.current) {
      countryInfoRef.current.focus();
    }
  }, [selectedCountry]);

  //Event handlers
  const handleSearch = (e) => {
    const newFilter = e.target.value
    setFilter(newFilter)

    const newFilteredCountries = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )

    setSelectedCountry(
      newFilteredCountries.length === 1 ? newFilteredCountries[0] : null
    )
  }

  const showCountry = (country) => {
    if (country.name === selectedCountry?.name) {
      return
    }
    setSelectedCountry(country)
  }


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  //UI
  return (
    <>
      <button className="back-to-top-btn" onClick={scrollToTop}>
        <i className="fas fa-chevron-up"></i>
      </button>
      <main>
        <h1>Explore Countries</h1>
        <Search
          handleSearch={handleSearch}
          value={filter}
        />
        {countriesLoading ? (
          <ClipLoader color="#36d7b7" loading={true} size={50} />
        ) : (
          <div className='card-container'>
            <ul className='country-list'>
              <CountryList
                filteredCountries={filteredCountries}
                showCountry={showCountry}
              />
            </ul>
            {selectedCountry &&
              <CountryInfo
                ref={countryInfoRef}
                selectedCountry={selectedCountry}
                weatherLoading={weatherLoading}
              />
            }
          </div>
        )}
      </main>
    </>
  )
}

export default App