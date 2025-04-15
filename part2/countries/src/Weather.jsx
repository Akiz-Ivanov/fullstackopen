const Weather = ({ capital, weather }) => {

    const tempColor = weather.main.temp >= 30
        ? '#EF4444'
        : weather.main.temp >= 20
            ? '#fb923c'
            : '#3B82F6';

    return (
        <div className="weather-info">
            <h2>Weather in {capital}</h2>
            <p style={{ color: tempColor }}>Temperature: {weather.main.temp} °C</p>
            {weather.weather?.map((condition, index) => (
                <img
                    key={index}
                    src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                    alt={`Weather icon: ${condition.description}`}
                    title={condition.description} />
            ))}
            <p className="wind-speed">Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather