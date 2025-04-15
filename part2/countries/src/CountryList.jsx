const CountryList = ({ filteredCountries, showCountry }) => {
    if (filteredCountries.length > 10) {
        return <p className="country-warning">Too many matches, specify another filter</p>
    }

    return (
        <>
            {filteredCountries.map(country => (
                <li className="country-item" key={country.cca3}>
                    <span className="country-name">{country.name.common}</span>
                    <button className="show-btn" onClick={() => showCountry(country)}>Show</button>
                </li>
            ))}
        </>
    )
}

export default CountryList