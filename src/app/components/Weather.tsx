"use client"; // for Next.js App Router

import { WeatherData, fetchWeather, fetchWeatherByCoords } from "../utils/wheather";
import { useEffect, useState } from "react";

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        const data = await fetchWeatherByCoords(latitude, longitude);
        setWeather(data);
        setLoading(false);
      });
    }
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    const data = await fetchWeather(city);
    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Weather App</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="border p-2 w-full rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {weather && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p>Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
