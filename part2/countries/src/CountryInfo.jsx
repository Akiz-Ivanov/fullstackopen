import Weather from "./Weather"
import { ClipLoader } from 'react-spinners'

const CountryInfo = ({ selectedCountry, ref, weatherLoading }) => {

    if (!selectedCountry) {
        return null
    }

    const {
        capital = ['No capital'],
        area = 0,
        languages = { eng: 'English' }, // Default to English if unknown
        flags = {
            png: 'https://placehold.co/600x400/gray/white?text=No+Flag',
            alt: 'No flag available'
        },
        weather,
        name = { common: 'Unknown' },
        region = 'Unknown Region',
        population = 0,
        currencies = {
            XXX: {
                name: 'Unknown Currency',
                symbol: '¤'
            }
        },
        timezones = ['UTC']
    } = selectedCountry

    return (
        <div className="country-info" ref={ref} tabIndex="-1">
            <div className="country-info-details">
                <h2>{name.common}</h2>
                <p>Capital: {capital[0]}</p>
                <p>Area: {area.toLocaleString()} km²</p>
                <p>Region: {region}</p>
                <p>Population: {population.toLocaleString()}</p>
                <p>Currency: {Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                <p>Timezone: {timezones.join(', ')}</p>

            </div>
            <div className="country-info-details">
                <img
                    src={flags.png}
                    alt={name.common} />
            </div>
            <div className="country-info-details">
                <h2 className="languages-title">Languages</h2>
                <ul>
                    {Object.entries(languages).map(([code, name]) =>
                        <li key={code}>
                            <p>{name}</p>
                        </li>
                    )}
                </ul>
            </div>
            {weatherLoading ? (
                <ClipLoader color="#36d7b7" loading={true} size={50} />
            ) : (
                <div>
                    {weather ?
                        <Weather
                            capital={capital[0]}
                            weather={weather}
                        />
                        : null
                    }
                </div>
            )}
        </div>
    )
}

export default CountryInfo