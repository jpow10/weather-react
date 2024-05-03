import React, { useState } from "react";
import axios from "axios";

export default function Forecast() {
  const [city, setCity] = useState(null);
  const [message, setMessage] = useState({});
  const [loaded, setLoaded] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function showTemperature(response) {
    setLoaded(true);
    setMessage({
      Temperature: response.data.main.temp,
      Description: response.data.weather[0].description,
      Humidity: response.data.main.humidity,
      Wind: response.data.wind.speed,
      Icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac209dae1f283fb332a5bb7f50b0f468&units=metric`;
    axios.get(url).then(showTemperature);
  }

  if (loaded) {
    return (
      <div>
        <h1>Weather App</h1>
        <form>
          <input type="search" onChange={updateCity} />
          <input type="submit" value="search" onClick={handleSearch} />
        </form>
        <ul>
          <li>Temperature: {Math.round(message.Temperature)}ºC</li>
          <li>Description: {message.Description}</li>
          <li>Humidity: {message.Humidity}</li>
          <li>Wind: {message.Wind}km/h</li>
          <li>
            <img alt="icon" src={message.Icon}></img>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="Search">
        <h1>Weather App</h1>
        <form>
          <input type="search" onChange={updateCity} />
          <input type="submit" value="search" onClick={handleSearch} />
        </form>
      </div>
    );
  }
}
