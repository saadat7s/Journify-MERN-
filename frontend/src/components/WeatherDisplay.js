import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'bd098c1788bcaf93dae4ada8e889ab34';
        const city = 'Islamabad'; // Replace with your desired city
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      {weatherData && (
        <div className='d-flex p-2 align-items-center'>
          {/* Display the weather icon */}
          <FontAwesomeIcon icon={faSun} className="weather-icon" />

          {/* Display the temperature */}
          <p className="temperature m-0">{parseInt(weatherData.main.temp)}°C</p>
        </div>
      )}
    </>
  );
};

export default WeatherDisplay;
