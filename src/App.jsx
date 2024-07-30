import { useState } from 'react';

/*
React Weather Dashboard


We provided some simple React template code. Your goal is to build a weather dashboard application that lets users search for current weather conditions in different cities.

When the app loads, it should display a search bar where users can type in a city's name. Once the city name is entered (case-sensitive) and the user hits the "Search" button, the app should display the current temperature, humidity, and wind speed for the chosen city. For simplicity, you don't have to make actual API calls; instead, use the predefined data to mimic the weather data for a few cities.

Additionally, all previously searched cities should be listed below the search bar as buttons. When a user clicks on a previously searched city, its weather data should be displayed again.

Ensure the application handles scenarios where the city is not in your mock data by displaying a message: "City not found." You are free to add classes and styles, but make sure you leave the component ID's and classes provided as they are. Submit your code once it is complete and our system will validate your output.


*/

// instead of requesting data from an API, use this mock data
const mockWeatherData = {
  'New York': {
    temperature: '22°C',
    humidity: '56%',
    windSpeed: '15 km/h'
  },
  'Los Angeles': {
    temperature: '27°C',
    humidity: '45%',
    windSpeed: '10 km/h',
  },
  'London': {
    temperature: '15°C',
    humidity: '70%',
    windSpeed: '20 km/h'
  },
};


function HistoryButton(props) {
  const { city, onClick } = props;
  return (<button key={city} id="cityButton" onClick={() => onClick(city)}>{city}</button>);
}


function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = () => {
    if (mockWeatherData[city]) {
      setWeather(mockWeatherData[city]);
      setHistory(prevHistory => [...new Set([city, ...prevHistory])]);
    } else {
      setWeather('City not found.');
    }
  };

  const handleCityClick = (city) => {
    setCity(city);
    setWeather(mockWeatherData[city]);
  };

  return (
    <div>
      <input type="text" id="citySearch" placeholder="Search for a city..." value={city} onChange={(e) => setCity(e.target.value)} />
      <button id="searchButton" onClick={handleSearch}>Search</button>
      <div id="previousSearches">
        {history.map(
          city => <HistoryButton key={city} city={city} onClick={handleCityClick} />
        )}
      </div>
      <div id="weatherData">
        {weather && (
          typeof weather === 'string' ? (
            <div>{weather}</div>
          ) : (
            <>
              <div>Temperature: {weather.temperature}</div>
              <div>Humidity: {weather.humidity}</div>
              <div>Wind Speed: {weather.windSpeed}</div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default WeatherDashboard;
