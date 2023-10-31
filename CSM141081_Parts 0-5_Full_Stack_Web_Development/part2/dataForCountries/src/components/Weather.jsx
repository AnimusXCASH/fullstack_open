import { getWeather } from "../services/services";
import { useState, useEffect } from "react";

export const CountryWeather = ({location}) =>{
    const [weatherData, setWeatherData] = useState({})
    const [error, setError] = useState(false)

    useEffect(()=>{
        getWeather(location).then(response =>{
            setError(false)
            setWeatherData(response.data)
        }).catch(error=>{
            console.log(`Error fetchinda ta: ${error}`)
            setError(true)
        })    
    }, [location])


    return (
        <div>
            {error ? (
                <div>Error retrieving weather data for {location}</div>
                ) : (
                weatherData && weatherData.main? (
                    <div>
                        Weather in {location}
                        <p>Temperature: {weatherData.main.temp}°C</p>
                            {weatherData.weather && weatherData.weather[0] && (
                            <img 
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                                alt={weatherData.weather[0].description}
                            />
                        
                    )}
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    </div>
                ) : (
                    <div>Loading weather data...</div>
                )
            )}
        </div>
    )
    
}