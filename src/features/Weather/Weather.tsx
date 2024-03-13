import { FormEvent, useEffect, useState } from 'react';

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '1h': number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: 'RO' | 'DE' | 'US';
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [formValues, setFormValues] = useState<{
    city: string;
    country: Sys['country'];
  }>({
    city: '',
    country: 'RO',
  });

  useEffect(() => {
    const { city, country } = formValues;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=8feb7eed04a11a56e7ac15279797d21d&units=metric`
    )
      .then((res) => res.json())
      .then((data: WeatherData) => setWeatherData(data));
  }, [formValues]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    setFormValues({
      city: formData.get('city') as string,
      country: formData.get('country') as Sys['country'],
    });
  }

  // function handleInputChange(
  //   e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) {
  //   setFormValues({
  //     ...formValues,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  if (!weatherData) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <h1>Weather</h1>
      <form onSubmit={handleSearch}>
        <p>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            // value={formValues.city}
            // onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id="country"
            // value={formValues.country}
            // onChange={handleInputChange}
          >
            <option value="RO">Romania</option>
            <option value="DE">Germany</option>
            <option value="US">USA</option>
          </select>
        </p>
        <p>
          <button type="submit">Search</button>
        </p>
      </form>
      The weather in {weatherData.name} is {weatherData.weather[0].description}
      .
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
      <p>Currently: {weatherData.main.temp} &deg;C</p>
      <p>
        Minimum temp: {weatherData.main.temp_min}; Maximum temp:{' '}
        {weatherData.main.temp_max}
      </p>
    </>
  );
}
