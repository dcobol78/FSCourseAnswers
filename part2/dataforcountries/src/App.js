import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [newCountry, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const countryHandler = (event) => {
    setCountry(event.target.value);
    getData(event.target.value);
  };
  const getData = (value) => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${value}`)
      .then((response) => {
        setCountries(response.data);
      });
  };
  const showButtonHandler = (countryName) => {
    setCountry(countryName);
    getData(countryName);
  };

  return (
    <div>
      <AskCountry newCountry={newCountry} countryHandler={countryHandler} />
      <ShowCountry
        countries={countries}
        showButtonHandler={showButtonHandler}
      />
    </div>
  );
}

const AskCountry = ({ newCountry, countryHandler }) => {
  return (
    <div>
      type a country name <input value={newCountry} onChange={countryHandler} />
    </div>
  );
};

const ShowCountry = ({ countries, showButtonHandler }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specifiy another filter</div>;
  } else if (countries.length > 1) {
    return (
      <CountryList
        countries={countries}
        showButtonHandler={showButtonHandler}
      />
    );
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }
  return <div></div>;
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <Language language={country.languages} />
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        width="100"
        height="100"
      />
      <Weather country={country} />
    </div>
  );
};

const Weather = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  const getWeather = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      });
  };

  if (weatherInfo.length === 0) {
    getWeather();
    return <div></div>;
  } else {
    return (
      <div>
        <h3>{weatherInfo.location.name}</h3>
        temperature: {weatherInfo.current.temperature}
        <br />
        <img
          src={weatherInfo.current.weather_icons[0]}
          alt={weatherInfo.current.weather_descriptions[0]}
        />
        <br />
        <b>wind</b> {weatherInfo.current.wind_speed} mph direction{" "}
        {weatherInfo.current.wind_dir}
      </div>
    );
  }
};

const Language = ({ language }) => {
  return (
    <div>
      <ul>
        {language.map((lan) => (
          <li key={lan.name}>{lan.name}</li>
        ))}
      </ul>
    </div>
  );
};

const CountryList = ({ countries, showButtonHandler }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name}>
          {country.name}{" "}
          <button onClick={() => showButtonHandler(country.name)}>show</button>
        </p>
      ))}
    </div>
  );
};

export default App;
