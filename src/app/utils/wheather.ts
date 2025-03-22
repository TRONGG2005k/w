import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

export const fetchWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
